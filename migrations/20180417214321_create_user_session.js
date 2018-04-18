
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('user_sessions', (t) => {
            t.increments().primary()
            t.integer('user_id')
            t.boolean('isValid')
            t.string('token')
            t.timestamps()
        })
    ])
}

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('user_sessions')
    ])
}
