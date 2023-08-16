#!/usr/bin/env node
const program = require('commander');
const controllerGenerateFile = require("./generate/controller");
const serviceGenerateFile = require("./generate/service");
const middlewareGenerateFile = require("./generate/middleware");
const generateProject = require("./generate/createProject");
const modelGenerateFile = require("./generate/model");
const startServer = require("./start");
startServer();
controllerGenerateFile();
serviceGenerateFile();
middlewareGenerateFile();
modelGenerateFile();
program.parse(process.argv);