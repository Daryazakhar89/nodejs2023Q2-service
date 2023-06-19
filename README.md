# Home Library Service

## Prerequisites

* Git - [Download & Install Git](https://git-scm.com/downloads).
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Switch to dev2 branch

```
git checkout dev2
```

## Rename .env.example file to .env

```
 .env.example  =>  .env
```

## Installing NPM modules

```
npm install --legacy-peer-deps
```

## Running application without docker

```
npm run start:dev
```

## Build images and run them in containers (with docker)

```
npm run docker:compose
```

## Scan images for security vulnerabilities

```
npm run docker:scan
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing application without docker

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```
## Testing application with docker
```
npm run docker:test
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press<kbd>F5</kbd>to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging