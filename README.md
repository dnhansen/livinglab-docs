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

- `start`, which builds the Eleventy project and starts a server which listens at `localhost:8080`.
- `build`, which only builds the project. Note that the appropriate command is `npm run build`, since the command `npm build` is [shadowed by npm-build](https://docs.npmjs.com/cli/v6/commands/npm-build).

### Visual Studio Code Live Server

For use with the VS Code extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), correct the root directory by adding the property

    "liveServer.settings.root": "/_site"

to the `.vscode/settings.json` file.


## Deployment

TODO rest

### UML diagram rendering

The UML diagrams are drawn using [draw.io](https://www.drawio.com/) and saved as DRAWIO files (with extension `.drawio`). The application expects these to be rendered as PNG files.

TODO how to do this + write about it above in development.