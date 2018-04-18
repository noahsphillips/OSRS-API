let bookshelf = require('../lib/db'),
  Grade = bookshelf.Model.extend({
    tableName: 'grades',
    hasTimestamps: true,
    user() {
      return this.belongsTo('User', 'user_id')
    },
    course(){
      return this.belongsTo('Session','course_id')
    }
  }, {
    getAttributes: () => {
      return [
        'id',
        'course_id',
        'user_id',
        'grade_value',
        'created_at',
        'updated_at'
      ];
    }
  });

module.exports = bookshelf.model('Grade', Grade);
