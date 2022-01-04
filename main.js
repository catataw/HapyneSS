"use strict";
require('module-alias/register')
const  Hapi = require('@hapi/hapi')
const Logger =require ('@common/logger')
const Plugins =require('@middleware/register');
const qs = require('qs')
 class Main {

  static getInstance() {
    if (!Main.instance) {
      Main.instance = new Main();
    }

    return Main.instance;
  }

  async start() {
    Logger.info('Creating the server');
    this.Server = Hapi.Server({
      port: '8000',
      routes: { cors: true },
      query: {
        parser: query => qs.parse(query),
      },
    });

    Logger.info('Registering plugins');
    await Plugins(this.Server);

    Logger.info('Starting the server');
    await this.Server.start();
    //await DataBase.connect();

    Logger.info('Server is running on ' + this.Server.info.uri);
    return this;
  }

  async stop() {
    Logger.info('Stopping the server');
    await this.Server.stop();
    Logger.info('Bye :)');
    process.exit(0);
  }
}

module.exports =  Main.getInstance();

async function bootstrap() {
  const server = Main.getInstance();
  await server.start();

  process.on('SIGINT', () => server.stop());
  process.on('SIGTERM', () => server.stop());
}

bootstrap();