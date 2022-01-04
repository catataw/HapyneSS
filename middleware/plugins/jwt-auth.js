'use strict';

const Logger =require('@common/logger');
const Session =require('@middleware/common/session');

const  _= require('lodash');

const register = async (server) => {
  try {
    const validateUser = async (decoded, request) => {
      let result = await Session.getValue(decoded.id);

      if (!_.has(decoded, 'obj')) {
        return { isValid: false };
      }

      if (!_.has(result, 'obj.id')) {
        return { isValid: false };
      }

      if (decoded.obj.id === result.obj.id) {
        return { isValid: true };
      } else {
        return { isValid: false };
      }
    };
    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt', {
      key: 'jFNfWZnDGuQn4MW4aj3aKCGNt',
      validate: validateUser,
      verifyOptions: {
        ignoreExpiration: true,
      },
    });

    server.auth.default('jwt');
  } catch (err) {
    Logger.error(`Error registering logger plugin: ${err}`);
    throw err;
  }
};

module.exports = (() => {
  return {
    register,
    info: () => {
      return { name: 'JWT Authentication', version: '1.0.0' };
    },
  };
})();