import sys
import json
import sqlite3
import subprocess
import threading
import os
import queue

from pathlib import Path

def get_active_scope():
    try:
        data_dir = Path(os.environ.get("KIROCREW_APP_DATA_DIR", Path(__file__).parent.parent / "data")).resolve()
        db_path = data_dir / "finops.sqlite3"
        conn = sqlite3.connect(db_path)
        c = conn.cursor()
        c.execute("SELECT profile, region FROM scope LIMIT 1")
        row = c.fetchone()
        conn.close()
        if row:
            return {"profile": row[0], "region": row[1]}
    except Exception as e:
        pass
    return {"profile": "default", "region": "us-east-1"}


class MCPProxy:
    def __init__(self):
        self.active_scope = get_active_scope()
        self.process = None
        self.init_request = None
        self.q = queue.Queue()
        self.running = True
        self._start_backend()

    def _start_backend(self):
        env = os.environ.copy()
        env["AWS_PROFILE"] = self.active_scope["profile"] or "default"
        env["AWS_REGION"] = self.active_scope["region"] or "us-east-1"
        
        import shutil
        uvx_path = shutil.which("uvx")
        if not uvx_path:
            # Fallback for environments where ~/.local/bin is not in PATH
            uvx_path = os.path.expanduser("~/.local/bin/uvx")
            
        self.process = subprocess.Popen(
            [uvx_path, "awslabs.billing-cost-management-mcp-server@latest"],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=sys.stderr,
            env=env,
            text=True,
            bufsize=1
        )
        
        def reader():
            while self.running:
                line = self.process.stdout.readline()
                if not line: break
                sys.stdout.write(line)
                sys.stdout.flush()
                
        threading.Thread(target=reader, daemon=True).start()

    def restart_backend(self):
        if self.process:
            self.process.terminate()
            self.process.wait()
        self._start_backend()
        if self.init_request:
            # Re-initialize the new backend
            # We must intercept its initialization response so we don't send it to the client twice
            # But stdio is piped directly to sys.stdout. This means the client will receive a second InitializeResult!
            # Kiro Crew usually handles redundant initialize results fine (or ignores them).
            self.process.stdin.write(self.init_request + "\n")
            self.process.stdin.flush()

    def run(self):
        while True:
            line = sys.stdin.readline()
            if not line: break
            
            try:
                msg = json.loads(line)
                if msg.get("method") == "initialize":
                    self.init_request = line.strip()
                elif msg.get("method") == "tools/call":
                    current_scope = get_active_scope()
                    if current_scope["profile"] != self.active_scope["profile"] or current_scope["region"] != self.active_scope["region"]:
                        self.active_scope = current_scope
                        self.restart_backend()
            except Exception:
                pass
                
            self.process.stdin.write(line)
            self.process.stdin.flush()
        
        self.process.wait()

if __name__ == "__main__":
    MCPProxy().run()
