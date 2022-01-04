'use strict';

const Logger = require('@common/logger');

const register = async (server) => {
  try {
    return server.register([
      {
        plugin: require('hapi-swagger'),
        options: {
          info: {
            title: 'Task Api',
            description: 'Task Api Documentation',
            version: '1.0',
          },
          swaggerUI: true,
          documentationPage: true,
          documentationPath: '/api/docs',
        },
      },
    ]);
  } catch (err) {
    Logger.error(`Error registering swagger plugin: ${err}`);
  }
};

module.exports = (() => {
  return {
    register,
    info: () => {
      return { name: 'Swagger Documentation', version: '1.0.0' };
    },
  };
})();