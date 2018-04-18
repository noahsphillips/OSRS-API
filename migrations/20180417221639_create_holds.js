
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('holds', (t) => {
            t.increments().primary()
            t.integer('user_id')
            t.string('semester')
            t.boolean('isValid')
            t.text('reason')
            t.timestamps()
        })
    ])
}

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('holds')
    ])
}
