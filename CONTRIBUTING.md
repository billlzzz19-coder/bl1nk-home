# Contributing to BLinkOS Platform

First off, thank you for considering contributing to BLinkOS Platform! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)

## 📜 Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code.

## 🤝 How Can I Contribute?

### Reporting Bugs

- Use the bug report template
- Include detailed steps to reproduce
- Add screenshots if applicable
- Mention your environment (OS, browser, Node version)

### Suggesting Features

- Use the feature request template
- Explain the problem you're trying to solve
- Provide examples of how it would work

### Code Contributions

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write or update tests
5. Ensure all tests pass
6. Commit using conventional commits
7. Push to your fork
8. Open a Pull Request

## 🛠️ Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/blinkos-platform.git

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Run development server
npm run dev
```

## 🔄 Pull Request Process

1. **Update Documentation**: Update README.md if needed
2. **Add Tests**: Ensure your code is tested
3. **Run Tests**: `npm test` should pass
4. **Lint Code**: `npm run lint` should pass
5. **Type Check**: `npm run type-check` should pass
6. **Fill PR Template**: Complete all sections
7. **Request Review**: Tag relevant reviewers
8. **Address Feedback**: Respond to review comments

## 🎨 Coding Standards

### TypeScript

```typescript
// ✅ Good
interface User {
  id: string
  email: string
}

async function getUser(id: string): Promise<User> {
  // ...
}

// ❌ Bad
function getUser(id) {
  // ...
}
```

### React Components

```typescript
// ✅ Good
interface Props {
  title: string
  onClick: () => void
}

export default function MyComponent({ title, onClick }: Props) {
  return <button onClick={onClick}>{title}</button>
}

// ❌ Bad
export default function MyComponent(props) {
  return <button onClick={props.onClick}>{props.title}</button>
}
```

## 📝 Commit Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to standardize commit messages. Each commit message should start with a type (`feat`, `fix`, `docs`, etc.) and a short description.

### Example

```
feat: add search functionality to the marketplace

fix: correct typo in README

docs: update API integration guide
```

## ✔️ Tests and Coverage

Please ensure your contributions include tests. We use Jest and React Testing Library for unit tests. Aim for a minimum of 70% code coverage across the project. Run `npm test` locally before opening a pull request.

## 📚 Additional Resources

- [README.md](README.md) – Overview of the project, installation instructions, and features
- [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md) – Details on connecting to the bl1nk.site backend
- [SETUP_GUIDE.md](SETUP_GUIDE.md) – Step-by-step instructions for configuring your environment

Thank you for helping make BLinkOS Platform better! 🙏