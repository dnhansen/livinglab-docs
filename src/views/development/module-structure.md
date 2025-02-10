---
title: "Module structure"
stakeholderConcerns: "TODO"
model:
  path: "layers"
  modelKind: "UML package diagram"
  source:
    id: "rozanski-woods"
    page: 360
elements:
  - title: "User interface"
    content: |
      The web-based user interface is implemented in this module.
  - title: "Back-end"
    content: |
      The business logic and domain model are implemented in this module. It provides the following functionality:
      - Exposing an API to be consumed by users.
      - Authenticating users and authorising user requests.
      - Validation and handling of user requests.
      - Error handling.
      - Caching.
  - title: "Database"
    content: "The database and database management system are implemented in this layer."
layout: "layouts/view.njk"
---
