'use strict'
const  glob =require('glob');
const Logger = require('@common/logger');


module.exports= async server => {
  let loaders =  [];

  let globOptions = {
    nodir: true,
    strict: true,
    cwd: process.cwd(),
  };

  let plugins = glob.sync(__dirname + '/plugins/**/*.+(js|ts)', globOptions);
  let decorators = glob.sync(__dirname + '/decorators/**/*.+(js|ts)', globOptions);
  let loader = glob.sync(__dirname + '/loader/**/*.+(js|ts)', globOptions);
  let files = plugins.concat(loader, decorators);
  files.forEach((name) => {
    let plugin = require(name)
    Logger.info(`Register Plugin ${plugin.info().name} v${plugin.info().version}`);
    loaders.push(plugin.register(server));
  });

  await Promise.all(loaders);

  Logger.info('All plugins registered successfully.');
};