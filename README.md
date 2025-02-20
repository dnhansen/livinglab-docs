# LivingLab Documentation

This is the README file for the LivingLab *documentation*, and not for LivingLab itself.

## Development

### Requirements

This project requires an up-to-date installation of [Node.js](https://nodejs.org/). The instructions below assume that [npm](https://www.npmjs.com/) is used as package manager.

### Initialisation

To install all dependencies, run the command

    npm install

### Node.js scripts

The `package.json` file defines the following scripts:

- `clean`: Removes output directory `docs`.
- `build`: Cleans and builds the project. Files are output to the `docs` directory.
- `watch`: As `build`, but also listens for changes in the source directories and automatically builds on changes.
- `start`: As `watch`, but also starts a local web server which listens at `localhost:8080`. The site is served at the path `/livinglab-docs`.

To run these scripts, use the command

    npm run <script>

[Note that `start` can also be run using the command `npm start`.](https://docs.npmjs.com/cli/v11/commands/npm-start)

### Delete orphaned files

When running the `watch` or `start` scripts, note that the `docs` directory is only deleted when the script is started. Hence if source files are created and then deleted, there may be orphaned output files in the `docs` directory. Make sure to delete these, either manually or by running the `build` script.

### Visual Studio Code Live Server

Since there is a mismatch between the path on which the site expects to be served (namely `livinglab-docs`) and the directory containing the served files (`docs`), when using the VS Code extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), the files must be mounted at the correct path. To do this, add

    "liveServer.settings.mount": [
        ["/livinglab-docs", "./docs"]
    ]

to the `.vscode/settings.json` file.


## Deployment

This project is hosted at [`dnhansen.github.io/livinglab-docs`](https://dnhansen.github.io/livinglab-docs/).

### UML diagram rendering

The UML diagrams are drawn using [draw.io](https://www.drawio.com/) and saved as DRAWIO files (with extension `.drawio`). The application expects these to be exported and rendered as SVG files, one each for light and dark mode.

TODO how to do this + write about it above in development.


## Issues

### Eleventy server

If the development server provided by Eleventy experiences issues, consider using a different server such as [VS Code Live Server](#visual-studio-code-live-server).

### Problem writing Eleventy templates

When running the `watch` or `start` scripts, an error like

    Problem writing Eleventy templates

might occur. This happens if output files in the `docs` directory have been deleted while either script is running. To solve this problem, simply restart the script.