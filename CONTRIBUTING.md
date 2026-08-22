# Contributing to Woven Words

Thank you for your interest in contributing to **Woven Words**! We welcome bug reports, feature suggestions, documentation improvements, and code contributions.

Please review the guidelines below to ensure a smooth contribution process.

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please treat all community members with respect.

---

## How Can I Contribute?

### 1. Reporting Bugs
- Check existing [GitHub Issues](https://github.com/AdnanGhani07/nextjs-blog-website/issues) to verify the bug hasn't already been reported.
- Open a new issue using our **Bug Report** template.
- Include clear reproduction steps, expected behavior, screenshots (if applicable), and your environment details.

### 2. Suggesting Features & Enhancements
- Check existing issues or discussions before submitting a new feature idea.
- Open an issue using our **Feature Request** template describing the motivation, suggested design, and potential alternatives considered.

### 3. Submitting Pull Requests (PRs)
1. **Fork** the repository and clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/nextjs-blog-website.git
   cd nextjs-blog-website
   ```
2. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/my-new-feature
   # or
   git checkout -b fix/issue-description
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Configure environment**:
   ```bash
   cp .env.example .env.local
   ```
5. **Make your changes** and test locally:
   ```bash
   npm run dev
   ```
6. **Ensure linting passes**:
   ```bash
   npm run lint
   ```
7. **Commit your changes** with clear, descriptive commit messages:
   ```bash
   git commit -m "feat: add dark mode toggle for mobile nav"
   ```
8. **Push** to your fork and create a **Pull Request** against the `main` branch.

---

## Development Guidelines

- **TypeScript**: Maintain strict types where possible.
- **Code Style**: Adhere to ESLint and Prettier standards.
- **Components**: Place reusable components inside `/src/components` with descriptive names.
- **Security**: Never commit API keys, database connection strings, or secrets into source control.

---

## Questions or Need Help?

Feel free to open an issue or start a discussion in the repository!
