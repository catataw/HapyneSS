'use strict';

const Logger = require('@common/logger');

const register = async (server) => {
  try {
    return server.register({
      plugin: require('good'),
      options: {
        ops: {
          interval: 1000,
        },
        reporters: {
          consoleReporter: [{
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{
                error: '*',
                log: '*',
                response: '*',
                request: '*',
              }, ],
            },
            {
              module: 'good-console',
            },
            'stdout',
          ],
        },
      },
    });
  } catch (err) {
    Logger.error(`Error registering logger plugin: ${err}`);
    throw err;
  }
};

module.exports = (() => {
  return {
    register,
    info: () => {
      return {
        name: 'Good Logger',
        version: '1.0.0'
      };
    },
  };
})();