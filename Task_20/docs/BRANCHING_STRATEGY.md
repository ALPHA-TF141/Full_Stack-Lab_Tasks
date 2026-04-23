# Branching Strategy

## Main Branch

The `main` branch contains the stable version of the project.

## Feature Branches

Feature branches are created from `main` for isolated development.

Example:

```bash
git checkout main
git pull origin main
git checkout -b feature/login-ui
```

Another feature branch:

```bash
git checkout main
git checkout -b feature/payment-module
```

## Benefits

- isolates new work
- prevents unstable changes from affecting `main`
- supports parallel development
- makes code review easier
