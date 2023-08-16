const program = require('commander');
const shell = require('shelljs');
const path = require("path");
const fs = require("fs");

const startServer = () => {
  program
    .command('start')
    .description('start lumos server')
    .action((actionName) => {
    
    const file = path.join(process.cwd(), "index.js");


    if (fs.existsSync(file)) {
      shell.exec(`node ${file}`);
    } else {
      console.log("File does not exist:", file);
    }
  });
}

module.exports = startServer;