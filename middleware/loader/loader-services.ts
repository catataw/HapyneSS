const glob =require('glob');
const Logger =require('@common/logger');

module.exports = (() => {
  return {
    info: () => {
      return { name: 'router-services', version: '1.0.0' };
    },
    register: async (server)=> {
      try {
        server.ext('onPostAuth', function(request, reply) {
          if (request.auth.credentials == null) {
            return reply.continue;
          }

          return reply.continue;
        });

        server.ext('onRequest', async function(request, h) {
          if (request.url.pathname === '/') {
            return h.continue;
          }

          if (request.url.pathname.match('/api/health')) {
            return h.continue;
          }

          if (request.url.pathname.indexOf('/assets') > -1) {
            return h.continue;
          }

          if (request.url.pathname === '/api/signin') {
            return h.continue;
          }

          if (request.url.pathname.match('/api/recover/')) {
            return h.continue;
          }

          if (request.url.pathname === '/api/docs') {
            return h.continue;
          }

          return h.continue;
        });
      } catch (err) {
        Logger.error(`Error registering swagger plugin: ${err}`);
      }
    },
  };
})();

