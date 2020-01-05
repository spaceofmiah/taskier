# CONTRIBUTING GUIDE

Thank you for considering contributing to Taskier. Below is a guide to help you get started.


## Where do i go from here?

If you've noticed a bug or have feature request, [create an issue for it](https://github.com/spaceofmiah/taskier/issues/new)! It's best if you receive an approval for spotted bug or your feature request this way before starting to code.

## Fork and create a branch

I you can fix the bug, then [fork Taskier](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) and create a branch with a descriptive name.

A good branch name would be (where issue #45 is the ticket you're working on):

```
git checkout -b 45-add-drag-n-drop-features
```

work on your changes on the branch you've created, in this scenario it is `45-add-drag-n-drop-features`

## Test update

To test update, you'll have to build your code base using the below command

```
npm run build
```

You could also allow webpack to watch changes and automatically build your changes using this command

```
npm run watch
```

Be certain that your build passes and try playing with your updates using browser of choice.

**Feel free to ask for help**

If you're ready to make your contributions to this project but still feel lost, feel free to ask for help, everyone is a beginner at first :)


## Make a Pull Request

At this point, you should switch back to your master branch and make sure it's up to date with Taskier's master branch

```
git remote add upstream git@github.com:spaceofmiah/taskier.git
git checkout master
git pull upstream master
```

Then update your feature branch from your local copy of mater, and push it

```
git checkout 45-add-drag-n-drop-features
git rebase master
git push --set-upstream origin 45-add-drag-n-drop-features
```

Finally, go to Github and [make a Pull Request](https://help.github.com/articles/creating-a-pull-request).