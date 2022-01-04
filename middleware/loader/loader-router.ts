const glob =require('glob');
const Logger =require('@common/logger');
module.exports = (() => {
  return {
    info: () => {
      return { name: 'router-loader', version: '1.0.0' };
    },
    register: async (server) => {
      try {
        let globOptions = {
          nodir: true,
          strict: true,
          cwd: process.cwd(),
          ignore: '**/schema/*',
        };

        let routes = glob.sync(__dirname + '/../../routes/**/*.+(js|ts)', globOptions);
        routes.forEach((name) => {
          let plugin = require(name).default();
          plugin.register(server);
        });
      } catch (err) {
        Logger.error(`Error registering loader plugin: ${err}`);
      }
    },
  };
})();
