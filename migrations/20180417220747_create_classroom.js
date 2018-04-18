
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('classrooms', (t) => {
            t.increments().primary()
            t.integer('room_number')
            t.string('building_id')
            t.timestamps()
        })
    ])
}

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('classrooms')
    ])
}
