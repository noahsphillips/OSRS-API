
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('courses', (t) => {
            t.increments().primary()
            t.string('name')
            t.integer('department_id')
            t.string('number')
            t.string('time')
            t.string('semester')
            t.string('professor')
            t.integer('classroom_id')
            t.timestamps()
        })
    ])
}

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('courses')
    ])
}
