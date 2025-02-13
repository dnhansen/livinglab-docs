---
title: "Runtime platform"
description: |
  This view describes the processing nodes on which software elements are deployed, runtime containers, client nodes, and the basic network connections between nodes.
stakeholderConcerns: "TODO"
model:
  path: "runtime-platform"
  modelKind: "UML deployment diagram"
  source:
    id: "rozanski-woods"
    page: 378
elements:
  - title: "User host"
    content: |
      This node represents users who can access the application. After the web application is served to the user by the reverse proxy, the application runs in the user's browser on the user's machine.
      
      Note that the same browser can run multiple instances of the web application, and the same machine can run multiple browsers. Multiple instances of the web application can be connected to the web server simultaneously.
  - title: "Application server"
    content: |
      Represents the physical server on which the reverse proxy, the static pages containing the user interface, and the back-end application are deployed.
  - title: "Database server"
    content: "This node represents the physical server on which the database management system is deployed, and where the database is stored."
layout: "layouts/view.njk"
---
