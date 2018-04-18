// Update with your config settings.

module.exports = {

    development: {
        client: 'postgresql',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'tails',
            password: process.env.DB_PASS || 'tails',
            database: process.env.DB_NAME || 'osrs',
            port: process.env.DB_PORT || '5432',
            charset: 'utf8'
        }
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
