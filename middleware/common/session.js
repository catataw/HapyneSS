'use strict';

const Catbox = require('@hapi/catbox');
const Redis = require('@hapi/catbox-redis');
const Config = require('config');

class Session {
  

 static instance;

  constructor() {
    if (Session.instance) {
      throw new Error('Error - use Singleton.getInstance()');
    }
    const options = {
      partition: 'catbox',
      host: Config.get('session.host'),
      port: Config.get('session.port'),
      password: Config.get('session.password'),
    };
    let client = new Catbox.Client(new Redis(options));
    client.start(function(err) {
      if (!client.isReady()) {
        console.log(err);
      }
    });

    this.client = client;
  }

  static getInstance() {
    Session.instance = Session.instance || new Session();
    return Session.instance;
  }

  async setValue(key, value, ttl) {
    let id = { id: key, segment: 'session' };
    let cached = await this.client.set(id, value, ttl);
    return cached;
  }

  async getValue(key) {
    let id = { id: key, segment: 'session' };
    const cached = await this.client.get(id);
    return cached['item'];
  }
}

module.exports = Session.getInstance();