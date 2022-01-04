'use strict';

const Logger = require('@common/logger');

const register = async (server) => {
  try {
    await server.register(require('@hapi/vision'));
    await server.register(require('@hapi/inert'));
    await server.register(require('@hapi/h2o2'));
    await server.register([{
      plugin: require('hapi-cors'),
      options: {
        methods: ['POST, GET, OPTIONS', 'PUT', 'DELETE', 'PATCH'],
      },
    }, ]);

    server.views({
      engines: {
        html: require('handlebars')
      },
      relativeTo: __dirname + '../../../',
      path: 'views',
    });
  } catch (err) {
    Logger.error(`Error registering swagger plugin: ${err}`);
  }
};

module.exports = (() => {
  return {
    register,
    info: () => {
      return {
        name: 'Core Plugin',
        version: '1.0.0'
      };
    },
  };
})();