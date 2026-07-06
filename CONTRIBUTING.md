# Contributing to Handwritten Digital Recognition System (HDRS)

We are thrilled that you want to contribute to the **Handwritten Digital Recognition System (HDRS)**! This document outlines the guidelines and best practices for contributing to this project.

---

## 🗺️ Code of Conduct
This project is governed by a standard Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainer.

---

## 🛠️ Getting Started

### 1. Fork and Clone
1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/handwritten-digital-recognition-system.git
   cd handwritten-digital-recognition-system
   ```

### 2. Set Up Local Environment
Ensure you have the prerequisites installed:
- Python 3.10+
- Node.js 18+ (with npm)
- Tesseract OCR (if using Tesseract engine locally)

Set up the backend virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Set up the React Vite frontend:
```bash
cd frontend
npm install
```

---

## 🌿 Git Branching Strategy
We follow a standard Git workflow:
- **`main`**: The stable branch representing production-ready code.
- **`dev`**: The active integration branch for features.
- **Feature Branches**: Created from `dev` using the format `feature/your-feature-name` or `bugfix/issue-description`.

### Creating a Pull Request (PR)
1. Branch off `dev`:
   ```bash
   git checkout -b feature/cool-new-feature
   ```
2. Make your changes and commit using clean, descriptive commit messages.
3. Push your feature branch to your fork:
   ```bash
   git push origin feature/cool-new-feature
   ```
4. Create a Pull Request from your fork's branch into the main repository's `dev` branch.

---

## 🎨 Coding Standards

### Python (Backend)
- Follow **PEP 8** style guidelines.
- Use explicit type hinting for function arguments and return types.
- Ensure all docstrings follow the standard Google Python Style format.
- Write docstrings for all public modules, classes, and methods.

### JavaScript/React (Frontend)
- Use standard functional components with hooks.
- Maintain a clean separation of styling in CSS files or inline styling where appropriate.
- Keep components small, focused, and reusable.

---

## 🧪 Testing Your Changes
Before submitting a PR, make sure your changes do not break existing features:
- Test the backend locally using uvicorn:
  ```bash
  python -m uvicorn backend.app:app --port 8000 --reload
  ```
- Test the frontend locally using Vite's dev server:
  ```bash
  npm run dev
  ```
- Verify recognition outputs on standard samples in the `data/samples/` directory.

---

## 📄 License
By contributing to this repository, you agree that your contributions will be licensed under the project's **MIT License**.
