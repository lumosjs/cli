const program = require('commander');
const shell = require('shelljs');
const path = require("path");
const fs = require("fs");

const middlewareGenerateFile = () => {
  program
    .command('add:middleware <middleware-name>')
    .description('Create a new middleware file')
    .action((middlewareName) => {
    
    const filePath = path.join(process.cwd(), "app", "middlewares");
    const content = `
    export function ${middlewareName}(req, res, next) {
      const isAuth = true;
      if (isAuth) {
        next();
      } else {
        res.json({message:"Acesso não autorizado!"});
      }
    }

    `;

    if(fs.existsSync(filePath)){
      fs.writeFileSync(`${filePath}/${middlewareName}.js`, content);
      console.log(`Middleware created in ${filePath}/${middlewareName}.js`)
    }else{
      console.log(`Directory middlewares does not exist:${filePath}`);
    }
  });
}

module.exports = middlewareGenerateFile