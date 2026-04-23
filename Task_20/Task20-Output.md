# Task 20 Output

## Objective

Implement branching strategies in Git by creating feature branches, performing merging and rebasing operations, and understanding merge conflict resolution.

## Task Summary

A sample project was prepared to demonstrate:

- feature branch creation
- merge workflow
- rebase workflow
- intentional merge conflict creation
- conflict resolution steps

## Sample Branch Names

- `main`
- `feature/login-ui`
- `feature/payment-module`

## Commands Demonstrated

### Create feature branch

```bash
git checkout -b feature/login-ui
git checkout -b feature/payment-module
```

### Merge a branch

```bash
git checkout main
git merge feature/login-ui
```

### Rebase a branch

```bash
git checkout feature/payment-module
git rebase main
```

### Resolve conflict after merge

```bash
git add src/app.txt
git commit -m "Resolve merge conflict"
```

### Resolve conflict after rebase

```bash
git add src/app.txt
git rebase --continue
```

## Learning Outcome

This task shows how branching strategies help manage parallel development and how merge conflicts can be identified and resolved safely.

## Submission Note

This `Task20` folder is designed to be added to the existing `FullStack-Tasks` repository and pushed using:

```bash
git add Task20
git commit -m "Add Task20 branching strategy demo"
git push origin main
```
