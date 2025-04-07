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
          ├── Directory.Build.props
          ├── src/
          │   ├── Directory.Build.props
          │   ├── LivingLab/
          │   │   ├── LivingLab.csproj
          │   │   ├── Program.cs
          │   │   ├── appsettings.Development.json
          │   │   ├── appsettings.json
          │   │   └── Properties/
          │   │       └── launchSettings.json
          │   └── LivingLab.Module/
          │       ├── LivingLab.Module.csproj
          │       ├── Element.cs
          │       ├── ...
          │       └── DependencyInjection/
          │           └── ServiceCollectionExtensions.cs
          └── test/
              ├── Directory.Build.props
              └── LivingLab.Module.Tests/
                  ├── LivingLab.Tests.csproj
                  ├── ElementTests.cs
                  └── ...
      
      These files should contain the following:

      - `LivingLab.sln`: The solution file referencing every project.
      - `Directory.Build.props`: Folder-specific settings. Note that by default, only the most specific (i.e., most deeply nested in the directory hierarchy) such file is read, cf. [Microsoft's documentation](https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory#use-case-multi-level-merging).
      - `src/` and `test/`: Production and test code, respectively.
      - `LivingLab*.csproj`: Project-specific settings. Note that every project (both in `src` and `test`) should reference the composition root (the `LivingLab` project), and that the composition root should reference every project in `src` (cf. the [module structure](/views/development/module-structure/)).
      - `Program.cs`: The application entry point. Only the composition root should contain an entry point.
      - `appsettings.Development.json`: TODO
      - `appsettings.json`: TODO
      - `Properties/launchSettings.json`: TODO
      - `DependencyInjection/`: Extension methods for dependency injection. Only relevant outside the composition root. TODO more details?
      - `<filename>Tests.cs`: Unit tests for elements in `<filename>.cs`.

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
