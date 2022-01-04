'use strict';

class Repository {

  constructor(server, modelName) {
    this.server = server;
    this.modelName = modelName;
  }


  getModel() {
    return this.server.app.bookshelf.model(this.modelName);
  }

}


module.exports = Repository