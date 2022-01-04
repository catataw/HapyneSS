/**
 * Ambientes disponíveis no Knex
 * @type {Object}
 */
module.exports = {
  /**
   * Ambiente de Desenvolvimento
   * Localhost
   * @type {Object}
   */
  development: {
    client: 'postgresql',
    connection: {
      host: '0.0.0.0',
      database: 'api_exemplo',
      user: 'matheus',
      password: 'batatinha'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  /**
   * Ambiente de Testes e Homologação
   * @type {Object}
   */
  container: {
    client: 'postgresql',
    connection: {
      host: 'postgresql',
      database: 'api_exemplo',
      user: 'matheus',
      password: 'batatinha'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  /**
   * Ambiente de Produção
   * @type {Object}
   */
  production: {
    client: 'postgresql',
    connection: {
      host: 'http://urldobanco.com',
      database: 'api_exemplo',
      user: 'usuariodobanco',
      password: 'senhadobanco'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};