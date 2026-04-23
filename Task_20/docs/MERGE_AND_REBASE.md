# Merge And Rebase

## Merge

Merge combines branch history and preserves separate branch commits.

```bash
git checkout main
git merge feature/login-ui
```

## Rebase

Rebase moves feature branch commits on top of the latest `main`.

```bash
git checkout feature/payment-module
git rebase main
```

After successful rebase:

```bash
git checkout main
git merge feature/payment-module
```

## Difference

- `merge` keeps branch history visible
- `rebase` creates a cleaner linear history
