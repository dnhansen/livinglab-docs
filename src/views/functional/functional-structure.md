---
title: "Functional structure"
stakeholderConcerns: "TODO"
model:
  path: "cnc"
  modelKind: "UML component diagram"
  source:
    id: "rozanski-woods"
    page: 271
elements:
  - title: "Web browser"
    content: |
      This component represents the user's web browser. The web browser sends HTTP request to the reverse proxy to request static pages for rendering the web application.
  - title: "Web application"
    content: |
      This component represents the web application running in the user's browser, and is hence nested inside the browser component. The web application sends API requests to the reverse proxy.
  - title: "Reverse proxy"
    content: "The reverse proxy has two interfaces, one which serves static pages when queried, and one which handles API requests. When queried on the latter interface, the request is simply forwarded to the back-end."
  - title: "Back-end"
    content: "TODO"
  - title: "Database"
    content: "TODO"
layout: "layouts/view.njk"
---
