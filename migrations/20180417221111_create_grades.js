
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('grades', (t) => {
            t.increments().primary()
            t.integer('course_id')
            t.integer('user_id')
            t.string('grade_value')
            t.timestamps()
        })
    ])
}

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('grades')
    ])
}
