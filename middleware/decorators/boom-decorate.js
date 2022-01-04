const Boom = require('@hapi/boom');


const boomFunctions = [
  'badRequest',
  'unauthorized',
  'paymentRequired',
  'forbidden',
  'notFound',
  'methodNotAllowed',
  'notAcceptable',
  'proxyAuthRequired',
  'clientTimeout',
  'conflict',
  'resourceGone',
  'lengthRequired',
  'preconditionFailed',
  'entityTooLarge',
  'uriTooLong',
  'unsupportedMediaType',
  'rangeNotSatisfiable',
  'expectationFailed',
  'badData',
  'preconditionRequired',
  'tooManyRequests',
  'badImplementation',
  'internal',
  'notImplemented',
  'badGateway',
  'serverUnavailable',
  'gatewayTimeout',
  'illegal',
  'teapot',
];


module.exports = (() => {
  return {
    info: () => {
      return { name: 'boom-decorate', version: '1.0.0' };
    },

    register: async (server) => {
      try {
        boomFunctions.forEach(boomFunction => {
          server.decorate('toolkit', boomFunction, function() {
            throw Boom[boomFunction].apply(Boom, arguments);
          });
        });

        /*server.decorate('toolkit', 'boom', function() {
          let args = Array.prototype.slice.call(arguments);
          let boom;
          console.log(args)
          if (args.length > 1 && args[1] instanceof Error) {
            boom =  Boom.bo(args[1], args[0], args.slice(2, args.length - 2))
          } else {
            boom = new Boom.Boom(null, args)
          }
          throw boom;
        });*/
      } catch (err) {
        console.log(`Error registering swagger plugin: ${err}`);
      }
    },
  };
})();