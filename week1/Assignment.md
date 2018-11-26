Hello friends!

It's Timbot, your instructor for the exciting course on building web services (using XML!). I have your first assignment, which is a very simple one. It is designed to help me get to know you and your programming ambitions. And it will open up communication between us - which is particularly important when working remotely.

Assignment: _Write a markdown bio page to describe your background and your programming experience._

To do this assignment well, think of specific details. What languages do you program in? Have you done any commercial work? Any volunteer assignments? How long have you been programming? Did you come to Toronto from elsewhere? What are your goals and ambitions for programming? Do you have a dream-project you would work on?

We have some flexibility in this course, because web services drive every imaginable software today. From communities, to utilities, to entertainment and education - web services are behind everything.

So let's get thinking about what we want to build!

This week is about getting your environment set up in a way that will let you share your progress week-to-week.

## How to Complete

To complete assignments for the course, you'll need to get familiar with using Git.

Git is currently the most popular programming tool in existence, used by all sizes of development projects for tracking and versioning code.

Git works via a remote repository (called the "origin") and a local client application. You'll need to download the client software for your operating system if you don't already have it.

[Download Git](https://git-scm.com/downloads)

Next, you'll need an account to access the secure origin for the course.

To get started, visit oddlylabs.com and create an account. Once complete, you'll be added to the "Humber" organization, which will give you full access to all the course examples, organized by week.

### Cloning the Course Material

Create a folder on the computer you'll be working with, and use the git client to clone the CPAN202 repo from the Humber organization. The command will look like:

`git clone https://oddlylabs.com/Humber/CPAN202.git`

You'll be prompted for your login and password, which you created when you registered at `oddlylabs.com`.

### Creating your Repo

Create a new repository in your account at `oddlylabs.com` called "CPAN202". Be sure to include "node" as the .gitignore template, and choose the MIT license. Allow the site to generate a default `Readme.md` file.

From your local computer, use git to clone the newly created repository.

On your local system, use your command line to enter the folder you have just cloned (your repo).

Create a branch called "week1"

`git checkout -b "week1"`

Update the Readme file to complete Assignment 1, by including information about your goals as a developer.

Add and commit the Readme file.

```bash
git add week1/Readme.md

git commit -m "Completing assignment 1"
```

Push the branch to the remote repository.

```bash
git push origin week1
```

Now that you have completed your work and pushed it to the origin repo, you can finish by merging the week1 branch into the master branch. To do this properly, you should create a "pull request" at `oddlylabs.com`.

A pull request is a best-practice for merging new code into a master branch, and generally involves having someone else review and approve the code. But for now, you can assign the pull request to yourself.

### Additional Resources

[Basic Branching and Merging in Git](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)

_Videos_

[Creating Account, Making a Repo](https://youtu.be/-ngFD7hQ47k)

[Cloning the repo and doing work](https://youtu.be/-A5XawZzsmo)

[Pushing the repo to server, merging to master branch](https://youtu.be/0_ZrKlrlQkE)
