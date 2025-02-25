---
title: "Module structure"
description: |
  This view describes the system's source code modules, as well as their dependencies and hierarchy.
stakeholderConcerns: "TODO"
model:
  path: "module-structure"
  modelKind: "UML package diagram"
  source:
    id: "rozanski-woods"
    page: 360
elements:
  - title: "Client"
    content: |
      A consumer of the API exposed by the Presentation layer.
  - title: "Presentation"
    content: |
      This layer implements a minimal API containing the following:

      - A middleware pipeline, containing elements used for e.g. authentication and authorisation, logging, and endpoint routing.
      - API endpoints, by specifying which URLs are exposed by the API, and which handlers (in the Domain/application layer) should be called with which arguments.

      The Presentation layer depends on the ASP.NET Core framework for setting up the API, adding middleware elements, dependency injection containers, and adding API endpoints.

      This layer has a source code dependency on the Domain/application layer through references to methods used as API endpoint handlers.
  - title: "Domain/application"
    content: |
      In this layer the domain/business logic is implemented. Note that this layer cannot depend on any other layer, nor on the ASP.NET Core or EF Core frameworks. Hence it must expose interfaces that are implemented by the Infrastructure layer, and rely on dependency injection to obtain references to entities in said layer.
  - title: "Infrastructure"
    content: |
      This layer uses EF Core to access the DMBS. It has a source code dependency on the Domain/application layer through implementations of interfaces defined in said layer.
  - title: "Platform"
    content: |
      This layer encapsulates the libraries offered by the .NET platform. Note that only the Presentation layer may have dependencies on ASP.NET Core, while only the Infrastructure layer may depend on EF Core. In contrast, all packages except for the client (which is not implemented using .NET) may depend on the .NET Base Class Library.
layout: "layouts/view.njk"
---
