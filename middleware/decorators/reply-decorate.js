const Logger = require('@common/logger');

function decorateToolkitWithParams(reply, err) {
  Logger.error(err.message, err);
  switch (err.name) {
    case 'ModelNotFound': {
      reply.notFound(err);
    }
    case 'QueryError': {
      reply.preconditionFailed(err);
    }
    case 'ConflictError': {
      reply.conflict(err);
    }
    case 'Unauthorized': {
      reply.unauthorized(err);
    }
    //case 'ValidationError':{
    //  reply.preconditionFailed(Util.getErrorMessageFromValidation(err));
    //}
    default: {
      reply.badRequest(err.message);
    }
  }
}

module.exports = (() => {
  return {
    info: () => {
      return { name: 'reply-decorate', version: '1.0.0' };
    },
    register: async (server)=> {
      try {
        return server.decorate('toolkit', 'error', decorateToolkitWithParams);
      } catch (err) {
        console.log(`Error registering swagger plugin: ${err}`);
      }
    },
  };
})();
