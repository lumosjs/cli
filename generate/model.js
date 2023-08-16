const program = require('commander');
const shell = require('shelljs');
const path = require("path");
const fs = require("fs");

const modelGenerateFile = () => {
  program
    .command('add:model <model-name>')
    .description('Create a new model file')
    .action((modelName) => {
      const filePath = path.join(process.cwd(), "app", "models")

      if(fs.existsSync(filePath)){
        fs.writeFileSync(`${filePath}/${modelName}.js`, "angola de merda");
        console.log(`Model created in ${filePath}/${modelName}.js`)
      }else{
        console.log(`Directory models does not exist:${filePath}`);
      }
    });
}

module.exports = modelGenerateFile;