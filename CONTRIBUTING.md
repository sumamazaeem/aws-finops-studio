# Contributing to AWS FinOps Studio

Thank you for your interest in contributing to AWS FinOps Studio! We welcome community contributions, bug fixes, and feature enhancements.

To maintain security, reliability, and architectural integrity, all contributions must follow this process.

---

## 🔒 Governance & Merge Authority

- **Strict Maintainer-Only Merges**: Pull requests are **never merged automatically**.
- **Sole Review Authority**: Only the repository maintainer ([@sumamazaeem](https://github.com/sumamazaeem)) has write permissions to review, approve, and merge pull requests into `main`.
- **Branch Protection**: Direct pushes to `main` are restricted. All proposed changes must arrive via a reviewed Pull Request.

---

## 📐 Core Architecture Tenets

Any contribution must adhere to these foundational principles:

1. **Zero-Dependency Python Backend**:
   - The backend (`backend/server.py`, `backend/analytics.py`) must use **only the Python 3 Standard Library** (`sqlite3`, `json`, `subprocess`, `urllib`, `hashlib`, `decimal`).
   - Do **not** add third-party pip dependencies or `requirements.txt` runtime requirements.
2. **Pre-Bundled ESM Frontend**:
   - The UI runs directly from the pre-compiled ESM bundle (`dist/index.mjs`).
   - If you modify source code in `ui/src/`, you **must run `cd ui && npm run build`** and commit the resulting `dist/index.mjs`.
3. **Strictly Read-Only AWS Operations**:
   - FinOps Studio is designed for cost intelligence, anomaly detection, and optimization evidence.
   - It must **never** perform mutative AWS API calls (no resource creation, modification, deletion, or commitment purchases).
4. **Deterministic Financial Math**:
   - Financial totals, variances, deltas, and ratios must be calculated deterministically in `backend/analytics.py` using Python's `Decimal`.
   - Never allow LLMs or agents to perform mental financial calculations.

---

## 🛠️ Step-by-Step Contribution Workflow

### 1. Fork and Clone
Fork the repository to your own GitHub account, then clone it locally:
```bash
git clone https://github.com/<your-username>/aws-finops-studio.git
cd aws-finops-studio
```

### 2. Create a Feature Branch
Create a descriptive branch for your work:
```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/issue-description
```

### 3. Implement and Test
Make your changes following the architectural tenets above.

Run the test suite and verify UI build:
```bash
# 1. Run backend unit & integration tests
PYTHONPATH=. pytest

# 2. Build UI and verify ESM bundle
cd ui
npm install
npm run build
cd ..
```
All tests must pass (`22 passed`), and `dist/index.mjs` must build cleanly without errors.

### 4. Commit Your Changes
Use clear, conventional commit messages:
```bash
git commit -am "feat: describe your change concisely"
```

### 5. Submit a Pull Request
1. Push your branch to your GitHub fork:
   ```bash
   git push origin feat/your-feature-name
   ```
2. Navigate to [https://github.com/sumamazaeem/aws-finops-studio](https://github.com/sumamazaeem/aws-finops-studio).
3. Click **"Compare & pull request"**.
4. Fill in the Pull Request template:
   - **Summary**: What does this PR do?
   - **Motivation**: Why is this change necessary?
   - **Test Evidence**: Confirm that `PYTHONPATH=. pytest` and `npm run build` were executed and passed.
5. Submit the PR for review.

---

## 🔍 Code Review & Merging

1. **Review**: The maintainer will review your code for design adherence, security, and test coverage.
2. **Feedback**: If changes are needed, you can push additional commits to your branch and the PR will update automatically.
3. **Merge**: Once approved, the PR will be manually merged into `main` by [@sumamazaeem](https://github.com/sumamazaeem).
