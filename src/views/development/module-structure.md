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
  description: |
    TODO model description
elements:
  - title: "Client"
    content: |
      A consumer of the API exposed by the Presentation layer.
  - title: "Presentation"
    content: |
      This layer implements an ASP.NET Core minimal API containing the following:

      - A middleware pipeline, containing elements used for e.g. authentication and authorisation, logging, and endpoint routing.
      - API endpoints, handling API requests and delegating to the service layer.
      - Data transfer objects as appropriate, for encapsulating API requests and responses. Can be used to avoid exposing domain entities to the API user.

      The presentation layer depends on the ASP.NET Core framework for setting up the API, adding middleware elements, dependency injection containers, and adding API endpoints.

      This layer has source code dependencies on the service layer through references to concrete services, query objects, or DTOs passed to services.
  - title: "Service"
    content: |
      This layer implements services or the parts of services that do not depend on domain logic. It contains the following:

      - The service classes themselves.
      - Runners that are responsible for running domain logic for service classes, as well as for committing transactions to the database.
      - Query objects that help perform CRUD operations. Note that query objects are idiomatically implemented as extension methods in C#.
      - Data transfer objects used in database queries, in particular in query objects.

      This layer has dependencies on the domain layer, since services directly execute transaction scripts. It also depends on the data layer and EF Core since runners commit transactions to the database.

  - title: "Domain"
    content: |
      The domain layer does not contain a rich domain model, but instead contains transaction scripts responsible for implementing domain logic. It also defines the interfaces necessary for database access.

      This layer depends on the entities in the data layer, but otherwise has no dependencies.
  - title: "Data"
    content: |
      This layer is responsible for database access. It contains the following:

      - Domain entities. These are located here instead of in the domain layer since they are tightly coupled to EF Core. No domain logic is implemented in these entities.
      - The DbContext, which itself implements a unit of work.
      - Database access classes, possibly specific to each transaction script in the domain layer. These implement the interfaces defined in the domain layer.

      This layer has dependencies on the domain layer by dependency inversion. It also depends on EF Core for database access.
  - title: "Platform"
    content: |
      This layer encapsulates the libraries offered by the .NET platform. Note that only the presentation layer may have dependencies on ASP.NET Core, while only the service and data layers may depend on EF Core. In contrast, all packages except for the client (which is not implemented using .NET) may depend on the .NET Base Class Library.
layout: "layouts/view.njk"
---
