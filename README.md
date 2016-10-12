# astonishingowls
# Greenfield Project

#### Table of Contents
- [Overview](#overview)
  - [Duration and Milestones](#duration-and-milestones)
  - [Design](#design)
- [Basic Requirements](#basic-requirements)
  - [Group Formation](#group-formation)
  - [Role Assignment](#role-assignment)
  - [Project Organization](#project-organization)
  - [Product Design](#product-design)
  - [Project Infrastructure](#project-infrastructure)
    - [Project Backlog](#project-backlog)
    - [Contribution Guide](#contribution-guide)
    - [Style Guide](#style-guide)
    - [Project README](#project-readme)
  - [Continuous Deployment](#continuous-deployment)
  - [Team Communication](#team-communication)
    - [New Code](#new-code)
    - [Speaking to each other](#speaking-to-each-other)
  - [Product Development](#product-development)
- [Extra Credit](#extra-credit)
  - [Testing and You](#testing-and-you)
  - [Misc.](#misc.)



## Overview

### Duration and Milestones

The Greenfield project begins on Week 6 Day 4 (Thursday), runs through solo week, and ends on Week 7 Day 1 (Monday). During solo week you're expected to stay in contact with you group (via google hangouts, carrier pigeon, telepathy, etc.) and work 50% time (~5 hours per day).

You'll present you project to your cohort on Week 7 Day 1 (Monday) EOD. You'll use Monday to wrap up any lose ends and make sure your project is ready to for hand-off to the next team.

### Design
This project is the natural expansion of the MVP where the objective is to learn the feel of rapid iteration and continuous deployment. Far above the viability of the application as a 'product' or your team as a potential start-up.

Your teams have been assigned. You will work with your team to generate a project ideas, delegate roles, and build something awesome.

In a real work environment, you'll rarely have the opportunity to choose all of the people you collaborate with. Your success as an engineer will, in large part, be determined by how well you're able to integrate with varied groups of engineers. The ability to contribute to a shared vision and iterate towards it effectively among peers is extremely valuable. This sprint will help you hone that skill.

Greenfield Learning Objectives:
- project documentation
- group dynamics and collaboration
- product implementation
- project architecture
- product design

During the greenfield project, you must document your code, syntax styling, git workflow and feature roadmap in sufficient detail so that it can be handed to an arbitrary team with virtually no explanation.

This repo contains templates that you'll use as a guide to successfully document and structure your project on github. As you begin your project, you'll copy over the templates into a brand-new repo (public) you'll create as part of the process described below __--DON'T DO THAT YET__ (follow the steps).


## Basic Requirements

#### Group Formation
- [ ] Get into your assigned groups
- Each member should spend five minutes (no talking) answering the following questions:
  - [ ] What are my 2 greatest technical strengths?
  - [ ] What are my 2 greatest technical challenges?
  - [ ] What are my personal goals for this project?
- [ ] Discuss your answers with your group. Get to know each other.
- [ ] Begin brainstorming with your group about ideas in prep for the afternoon lecture.

#### Role Assignment
As a group, decide which team members will fulfill each of the three core scrum roles.
  - [ ] [Product Owner][2]
  - [ ] [Scrum Master][3]
  - [ ] [Development Team][4]
  - [ ] Fill out the Team section in the README with this info.

#### Project Organization
Each team has a totally awesome codename. You'll use it on GitHub and in your documentation until you choose a real name for your group. Don't worry about picking it at this point. Changing it later will be relatively easy and you'll likely refactor it several times after that anyway.
  - [ ] The Scrum Master must [Create a new GitHub Organization account](https://help.github.com/articles/creating-a-new-organization-account) for your team using your codename. Using a GitHub org ensures that all members share equally in the glory of the project.
  - [ ] Add all your team-mates as members to the new org.
  - [ ] Create a new project repo (same name as the org) in your new org
    - so you'll have a something like [spacekitten/spacekitten](https://github.com/spacekitten/spacekitten)

#### Product Design
Create product vision by drafting a 'Project Summary'
  - [ ] Copy `_PRESS-RELEASE.md` into the root directory of your own project repo and complete the exercise described therein. Note that the actual instructions are hidden in a comment block. You'll need to view the raw file, not the rendered markdown version to see them.
  - [ ] Use github issues

### Project Infrastructure
In order to support your current team _and_ future contributors to your project, you'll need to document your project as you build it. It should be the case that, without any intervention or additional explanation from you, the next team of collaborators  (or yourself in six months) can dive in and figure out how to start hacking easily.

Document your project and codebase to the point that if you decide to push it to hacker-news, anyone with a solid understanding of JavaScript can (after reviewing your documentation and comments) start submitting pull requests. Plan on not having any face-to-face interaction with the next team of collaborators. The most effective and efficient way to accomplish this is to do it right from the very start. Don't wait till the last minute. That will never work.
  - [ ] Heavily comment all aspects of your code.

#### Project Backlog

Be sure keep your project backlog (using github issues to Trello) up to date. There should be clear
documentation of tasks completed (github provides this functionality automatically) and
next steps/features in your project backlog so that your collaborators can just dive right in.

You should use github issues to track both your project's backlog of tasks and
fixes and to provide a way to track future goals. You can use labels to
organize issues and milestones to group issues together and to visualize your
progress.

You may want to take advantage of a tool like [waffle.io](https://waffle.io) to manage github
issues with a more powerful interface and can provide a kanban-board-like place to manage your
project and workflow.

#### Contribution Guide

- [ ] Document your team's git workflow by copying `_CONTRIBUTING.md` into the root directory of your repo and editing it suite your needs. It follows a [forking workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow).
  - You are **strongly** advised to use the workflow depicted below.

Though it advocates for a slightly different version of the example workflow, the article, [A romance of a single dimension: linear git history in practice](http://www.thumbtack.com/engineering/linear-git-history/) does an excellent job of explaining git workflow. I recommend reading it, even if you choose a different option.

##### Example Workflow Diagram

![Github Workflow](http://i0.wp.com/jpranaymartin.com/wp-content/uploads/2016/01/gf_git_workflow.png)

Above is the canonical workflow. You're welcome to use which ever git workflow you want as long as it works and your team is on board (consider that a warning). `_CONTRIBUTING.md` is provided here as a suggestion (with the intention of you editing it). But whichever workflow you choose, you must document it well, you __must__ be consistent, and you should always have someone other than the person who wrote the code review it before it's merged into the central repository.

#### Style Guide
- [ ] Document your team's style guide by copying `_STYLE-GUIDE.md` into the root directory of your repo. `_STYLE-GUIDE.md` is provided as a template, you should edit it to reflect your agreed upon setup.
  - [AirBnB's](https://github.com/airbnb/javascript) and [The Google JS Style Guide](https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml) are also excellent examples.

#### Project README
Your project README is the very first thing that users will see when they view your github project. It's the portal that must link to the other content files in the root of your repo.
- [ ] Use `_README.md` as a template to create a thorough README.
  - It must link to the documentation you've created (as described by the items above).

### Continuous Deployment
You must have a deployed website setup.
- [ ] Configure automatic deployment of your master branch using Azure, Heroku, Meteor, etc

### Team Communication

#### New Code

Your team should communicate new ideas for features or report important bugs
through github issues or whatever tool you use to manage github issues, that
way everyone on your project can see what important things are happening and
there is always a repository of further work to be done.

To introduce new code into your project, your team should _always_ make pull
requests - never make commits and push directly to master. After you make a
pull request, at least one other member of your team should do a thorough code
review of the changes and you should have a good back and forth where the code
is refactored and improved before being merged in. This will guarantee a higher
degree of code quality and will prevent careless errors from being merged into
your application.
- [ ] Read this excellent (and brief) [article about pull requests](https://github.com/blog/1124-how-we-use-pull-requests-to-build-github)

With continuous integration, you will benefit even more from a
pull request based workflow because you will always know that you are never
merging breaking code into your master branch.

#### Speaking to each other

You may want to use a persistent chat service like [hipchat][5], [slack][6], or irc to
communicate as a team so that you can have efficient asynchronous
communication. This will make your team more accountable and efficient, so you
don't have to stop everyone else's work to discuss small issues or request code
review.

### Product Development
- [ ] Create a simple home page for your project.
  - If you're not sure where to start, checkout using GitHub pages. It's free, robust, and can easily be personalized to your own domain.
  - [ ] Make the landing page a salesman's dream (clear, flashy, cool design, etc)! Templates are your friends!

### Testing and You

Use TDD.

Test driven development is not valuable because it catches errors, but because it changes the way you think about interfaces between modules. Writing tests before you write code influences how you think about the process. It provides a safety net for performing refactoring and it documents the expected behavior of the system.

Implement _all_ of the following:
  - [ ] Include testing when defining your project scope
  - [ ] Continuous integration to run all tests on commit
    - You can use any CI system you like, TravisCI (easy) or Circle-CI (med) or Jenkins (hard) are all options
  - [ ] Make testing part of daily stand-ups
  - [ ] Discuss testing during mentor check-ins

Implement 2-3 of the following:
  - [ ] Unit testing on the client
  - [ ] Unit testing on the server side
  - [ ] Integration testing for your API and database
  - [ ] End-to-end testing for your main workflows
  - [ ] Code coverage reports for unit tests
  - [ ] Visual testing for your app’s look and feel

### Misc.
- [ ] Create a screencast demo of the product and share on landing page.
- [ ] Write a technical blog post
- [ ] Maximize project exposure via reddit stuff
- [ ] Run usability tests, collect user feedback and simplify UI
- [ ] Schedule architecture and product review with mentor



<!-- LINKS -->

[1]:http://en.wikipedia.org/wiki/Scrum_(software_development)#Roles
[2]:http://en.wikipedia.org/wiki/Scrum_(software_development)#Product_owner
[3]:http://en.wikipedia.org/wiki/Scrum_(software_development)#Scrum_master
[4]:http://en.wikipedia.org/wiki/Scrum_(software_development)#Development_team
[5]:https://www.hipchat.com/
[6]:https://slack.com/
>>>>>>> chore(readme): adding readme
