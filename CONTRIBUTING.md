# Contributing to Bright Bytes

Thank you for your interest in contributing to Bright Bytes! We appreciate all contributions, including bug reports, feature requests, and code improvements.

## Code of Conduct

Please be respectful and constructive in all interactions. We're committed to providing a welcoming and inclusive environment.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/bright-bytes.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Set up your development environment (see README.md)

## Development Workflow

1. **Install development dependencies**: `pip install -r requirements-dev.txt`
2. **Create your feature or fix**
3. **Write tests** for your changes
4. **Run tests**: `pytest tests/ -v`
5. **Format code**: `black .`
6. **Lint**: `flake8 .`
7. **Commit with clear messages**: `git commit -m "Add feature: description"`
8. **Push to your fork**: `git push origin feature/your-feature-name`
9. **Submit a Pull Request**

## Commit Message Guidelines

- Use clear, descriptive commit messages
- Start with a verb: "Add", "Fix", "Update", "Refactor", etc.
- Keep it concise but informative

Examples:
- ✅ `Add health check endpoint`
- ✅ `Fix CORS header issue`
- ❌ `stuff` or `fix bug`

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass: `pytest tests/ -v`
4. Update CHANGELOG.md with your changes
5. Write a clear description of your changes

## Reporting Bugs

When reporting bugs, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, Python version, etc.)
- Error messages/logs

## Suggesting Features

When suggesting features:
- Describe the use case
- Explain why it would be useful
- Provide examples if possible
- Consider implementation challenges

## Code Style

We follow PEP 8 guidelines. Use `black` for formatting:

```bash
black .
```

## Questions?

- Check existing issues and discussions
- Ask in a new issue with the "question" label
- Review the README and documentation

Thank you for contributing! 🎉
