# Push To GitHub

Since this task is part of the existing `FullStack-Tasks` repository, push it through the current remote repository.

```bash
git add Task19
git commit -m "Add Task19 sample Git project"
git remote -v
git push origin main
```

If you want to create a separate GitHub repository for only the sample project, use:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/task19-sample-project.git
git branch -M main
git push -u origin main
```
