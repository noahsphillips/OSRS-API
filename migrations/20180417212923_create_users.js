
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('users', (t) => {
            t.increments().primary()
            t.string('first_name', 128)
            t.string('last_name', 128)
            t.string('username').unique().notNullable()
            t.string('password', 72).notNullable()
            t.string('role')
            t.date('birthday')
            t.json('address')
            t.timestamps()
        })
    ])
}

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('users')
    ])
}
