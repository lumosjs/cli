
const program = require('commander');
const shell = require('shelljs');
const path = require("path");
const fs = require("fs");

const generateProject = () => {
	program
  .version('1.0.0')
  .command('create <project-name>')
  .description('Create a new Lumos project')
  .action((projectName) => {

    const projectPath = path.join(process.cwd(), projectName);
    const pathScaffold = path.join(__dirname, "..",'lumosjs');

    console.log(`Creating a new lumos project: ${projectName}`);

    try {
      fs.mkdirSync(projectPath);
    } catch (err) {
      console.error('Error creating project directory:', err);
      process.exit(1);
    }

    // Copy all files from sombo to the project directory
    shell.cp('-R', `${pathScaffold}/*`, projectPath);

    // Manually copy the .env file
    try {
      fs.copyFileSync(path.join(pathScaffold, '.env'), path.join(projectPath, '.env'));
    } catch (err) {
      console.error('Error copying .env file:', err);
      process.exit(1);
    }

    console.log('Project created successfully!');

    console.log(`cd ${projectName}`);
    console.log('npm install');
    console.log('lumos start');

  });
}

module.exports = generateProject();