
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.table('courses', function (table) {
        table.string('professor_id')
      })
    ])
  };
  
  exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.table('courses', function (table) {
        table.dropColumn('professor_id')
      })
    ])
  };
  