---
title: "Codeline organisation"
description: |
  This view describes issues of source code structure, configuration management, testing, and continuous integration and delivery.
stakeholderConcerns: "TODO"
sections:
  - title: "Directory structure"
    content: |
      The back-end codebase should have the following rough directory structure:

          livinglab-backend/
          ├── LivingLab.sln
          ├── src/
          │   └── LivingLab/
          │       ├── appsettings.Development.json
          │       ├── appsettings.json
          │       ├── LivingLab.csproj
          │       ├── Program.cs
          │       ├── Service1.cs
          │       └── Service2.cs
          └── test/
              └── LivingLab.Tests/
                  ├── LivingLab.Tests.csproj
                  ├── Test1.cs
                  └── Test2.cs
      
      The directories `LivingLab` and `LivingLab.Tests` contain .NET projects, and the solution file `LivingLab.sln` should reference both projects.
  - title: Testing
    content: TODO
  - title: Configuration management
    content: |
      The project shall use Git for version control. Developers shall strive to integrate changes to the mainline branch as soon as their code is healthy (that is, they shall perform continuous integration, cf. {% cite 'fowler-ci' %}). Additional branches are allowed in personal workspaces of developers, as long as these are continuously merged with the mainline branch. Note that semi-integration, i.e., developers regularly pulling changes from mainline, is not sufficient, cf. {% cite 'fowler-ci' %}.

      TODO hiding work-in-progress
  - title: Continuous integration and delivery
    content: TODO
layout: "layouts/view.njk"
---
