// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/koroibos_dev',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true

  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/koroibos_test',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  production: {
      client: 'pg',
      connection: 'postgres://uwsequkmiyrvuz:ad0623bb87ce95154baf0239920b2dc179d67e7355d4fe9924c5d3fb6a640d57@ec2-54-174-229-152.compute-1.amazonaws.com:5432/d1v9jk715t9uu2',
      migrations: {
        directory: './db/migrations'
      },
      useNullAsDefault: true
    }
};
