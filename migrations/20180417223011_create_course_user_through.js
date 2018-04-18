
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTableIfNotExists('user_courses', (t) => {
        t.increments().primary();
        t.integer('user_id');
        t.integer('course_id');
        t.timestamps();
      })
    ]);
  };
  
  exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTableIfExists('user_courses')
    ]);
  };
  