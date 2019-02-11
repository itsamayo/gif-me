# Gif Me OSX/Windows/Linux Menubar App

The main files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

For local testing:

```bash
# Clone this repository
git clone https://github.com/AshKetchumza/gif-me.git
# Go into the repository
cd gif-me
# Install dependencies
npm install
# Run the app
npm start
```

For building a production executable for Windows & Mac

```bash
# Clone this repository
git clone https://github.com/AshKetchumza/gif-me.git
# Go into the repository
cd gif-me
# Install dependencies
npm install
# Compile executable
npm run dist
```

#### Contributors: [Ashley Sanders](https://twitter.com/AshMikeKetchum)