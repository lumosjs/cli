const program = require('commander');
const shell = require('shelljs');
const path = require("path");
const fs = require("fs");

const serviceGenerateFile = () => {
  program
    .command('add:service <service-name>')
    .description('Create a new service file')
    .action((serviceName) => {
    
    const filePath = path.join(process.cwd(), "app", "services",)    
    const content = `
    import user from "#model/User";

    async function index() {

    }

    async function store(data) {
      
    }


    async function show(id) {
     
    }


    async function update(id, data) {
     
    }


    async function destroy(id) {
     
    }

    export  {
      index,
      store,
      show,
      update,
      destroy,
    };
    `;


    if(fs.existsSync(filePath)){
      fs.writeFileSync(`${filePath}/${serviceName}.js`, content);
      console.log(`Service created in ${filePath}/${serviceName}.js`)
    }else{
      console.log(`Directory services does not exist:${filePath}`);
    }
  });
}

module.exports = serviceGenerateFile;