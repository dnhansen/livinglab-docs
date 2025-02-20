---
title: "Functional structure"
description: |
  This view models the runtime elements of the system, their exposed interfaces, and connectors between them.
stakeholderConcerns: "TODO"
model:
  path: "functional-structure"
  modelKind: "UML component diagram"
  source:
    id: "rozanski-woods"
    page: 271
elements:
  - title: "Front-end"
    content: |
      This component represents the front-end application running in the user's web browser. This is responsible for serving a graphical interface to the user, enabling the user to perform the actions permitted by the back-end. It is also responsible for sending requests to the back-end through a REST API.
  - title: "Back-end"
    content: |
      This component represents the back-end application. This exposes a REST API, through which consumers can perform permitted actions. It is composed of the following parts:

      - Middleware pipeline: This is responsible for authentication and authorisation, logging, error handling, and routing and endpoint selection.
      - Business logic: This part is responsible for handling incoming requests and forming responses.
      - Database service: This is responsible for communicating with the database management system, including object-relational mapping.
  - title: "Database management system"
    content: |
      This component is responsible for handling database access. TODO details
layout: "layouts/view.njk"
---
