---
title: "Installation"
description: |
  This view describes the software elements that need to be installed to move the system into production.
stakeholderConcerns: "TODO"
sections:
  - title: null
    content: |
      TODO figure out best way to handle versioning of dependencies.

      Below, `X` refers to the most recent stable release of PostgreSQL available for the operating system. (TODO which is this?) This view assumes that the database server and application server are distinct hosts.
  - title: "Database server"
    content: |
      - Operating system: The latest stable version of Debian.
      - PostgreSQL server: Install the Debian package `postgres-X`. Note that this package has a series of dependencies, some of which are mentioned below.
      - PostgreSQL client: This is installed by the Debian package `postgresql-client-X` which is a dependency of the package `postgres-X`, and thus this does not need to be installed separately.
      - PostgreSQL contrib: TODO do we need this? In any case it is a virtual package `postgresql-contrib-X` provided by `postgres-X`.
      - Database schemas: TODO installation (and configuration management) (does this belong here since it's part of CI/CD?)
  - title: "Application server"
    content: |
      - Operating system: Cf. database server.
      - PostgreSQL client: Install the Debian package `postgresql-client-X`. Note that the PostgreSQL server is *not* installed on the application server, so the client must be installed manually.
      - ASP.NET Core Runtime: Follow [Microsoft's instructions](https://learn.microsoft.com/en-us/dotnet/core/install/linux-debian) (TODO wget vs. curl?) for installing the package `aspnetcore-runtime-Y`, where `Y` is the latest version of .NET. TODO: STS vs. LTS? Note that it is not necessary to install the .NET Runtime. Note also that the linked instructions install the Microsoft Package Repository. (TODO list the repository separately?)
      - Reverse proxy: Debian package `nginx`.
      - Back-end application: TODO dll files (does this belong here since it's part of CI/CD?)
      - Front-end: TODO static files (does this belong here since it's part of CI/CD?)
  - title: "Client host"
    content: |
      - Web browser.
layout: "layouts/view.njk"
---
