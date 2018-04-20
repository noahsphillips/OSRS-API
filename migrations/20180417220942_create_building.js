
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('buildings', (t) => {
            t.increments().primary()
            t.string('building_name')
            t.string('building_number')
            t.timestamps()
        })
    ])
}

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('buildings')
    ])
}
