---
title: "Installation"
description: |
  This view describes the software elements that need to be installed to move the system into production.
stakeholderConcerns: "TODO"
sections:
  - title: null
    content: |
      TODO figure out best way to handle versioning of dependencies.

      This view assumes that the database server and application server are distinct hosts.
  - title: "Packages/modules"
    content: |
      In the following table, `X` refers to the most recent stable release of PostgreSQL available for the operating system, and `Y` refers to the desired version of .NET (TODO 8 vs. 9?).

      | Element | Debian | Rocky Linux |
      | ------- | ------ | ----------- |
      | PostgreSQL server | `postgresql-X` | `postgresql:X/server` |
      | PostgreSQL client | `postgresql-client-X` | `postgresql:X/client` |
      | ASP.NET Core Runtime | `aspnetcore-runtime-Y` | `aspnetcore-runtime-Y` |
      | Reverse proxy | `nginx` | `nginx` |

      Note the following:
      - The PostgreSQL server packages depend on the client packages.
      - On Rocky Linux, remember to enable the `postgresql` module before installing PostgreSQL packages.
      - The ASP.NET Core Runtime depends on the .NET Runtime (TODO at least on Rocky, but on Debian?).
      - The ASP.NET Core Runtime is not included in Debian's default package directory, so to install the package `aspnetcore-runtime-Y`, it is necessary to first install the package `packages-microsoft-prod.deb` from the [Linux software repository for Microsoft products](https://packages.microsoft.com/config/debian/). See also [Microsoft's instructions](https://learn.microsoft.com/en-us/dotnet/core/install/linux-debian) (TODO wget vs. curl?) for installing the package.
  - title: "Deployment on hosts"
    content: |
      ### Database server
      - Operating system
      - PostgreSQL server
      - PostgreSQL client
      - Database schemas: TODO installation (and configuration management)
  
      ### Application server
      - Operating system
      - PostgreSQL client
      - ASP.NET Core Runtime
      - Reverse proxy
      - Back-end application: TODO dll files
      - Front-end: TODO static files
  
      ### Client host
      - Web browser
layout: "layouts/view.njk"
---
