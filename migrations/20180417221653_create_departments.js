
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('departments', (t) => {
            t.increments().primary()
            t.string('name')
            t.string('name_short')
            t.integer('user_id') // Department Head
            t.timestamps()
        })
    ])
}

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('departments')
    ])
}
