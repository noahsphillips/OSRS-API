// Update with your config settings.
var pg = require('pg');
pg.defaults.ssl = true;

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
            host: process.env.DB_HOST || 'ec2-174-129-41-64.compute-1.amazonaws.com',
            user: process.env.DB_USER || 'tebszyqwmquvkb',
            password: process.env.DB_PASS || '5c6c8f3e52e927674557717afddf2ab34246a1975619b0bd166823767ed51575',
            database: process.env.DB_NAME || 'dd071k6ip5i3qc',
            port: process.env.DB_PORT || '5432',
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
