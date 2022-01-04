'use strict'

const db = require('../common/database');

const Event = db.Model.extend({
  tableName: 'events',
  
});

module.exports = Event