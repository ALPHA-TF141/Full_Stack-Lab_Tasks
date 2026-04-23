# Merge Conflict Demo

## Intentional Conflict Setup

Create two branches that modify the same line in `src/app.txt`.

### On `main`

```bash
git checkout main
```

Edit:

```text
Version: 1.1-main-update
```

Commit:

```bash
git add .
git commit -m "Update version in main"
```

### On `feature/login-ui`

```bash
git checkout feature/login-ui
```

Edit the same line:

```text
Version: 1.1-login-branch
```

Commit:

```bash
git add .
git commit -m "Update version in login branch"
```

## Trigger Conflict

```bash
git checkout main
git merge feature/login-ui
```

## Conflict Markers

Git shows markers like:

```text
<<<<<<< HEAD
Version: 1.1-main-update
=======
Version: 1.1-login-branch
>>>>>>> feature/login-ui
```

## Resolve Conflict

Choose the final line:

```text
Version: 1.1-resolved
```

Then run:

```bash
git add src/app.txt
git commit -m "Resolve merge conflict"
```

## Rebase Conflict Resolution

If conflict occurs during rebase:

```bash
git rebase main
```

Resolve the file, then continue:

```bash
git add src/app.txt
git rebase --continue
```
