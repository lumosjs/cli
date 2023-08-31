const program = require('commander');
const shell = require('shelljs');
const path = require("path");
const fs = require("fs");

const controllerGenerateFile = () => {
  program
    .command('add:controller <controller-name>')
    .description('Create a new controller file')
    .action((controllerName) => {
    
    const filePath = path.join(process.cwd(), "app", "controllers")
    const content = `
    import {
      index,
      store,
      show,
      update,
      destroy,
    } from '#service/User';

    export default async function create(req, res) {
        const userData = req.body;
        res.json(newUser);
      }
    `;

    if(fs.existsSync(filePath)){
      fs.writeFileSync(`${filePath}/${controllerName}.js`, content);
      console.log(`Controller created in ${filePath}/${controllerName}.js`)
    }else{
      console.log(`Directory controller does not exist:${filePath}`);
    }
  });
}

module.exports = controllerGenerateFile;