let bookshelf = require('../lib/db'),
  Course = bookshelf.Model.extend({
    tableName: 'courses',
    hasTimestamps: true,
    classroom() {
      return this.belongsTo('Classroom', 'classroom_id')
    },
    grades(){
      return this.hasMany('Grade','course_id')
    },
    users() {
        return this.belongsToMany('User', 'user_courses', 'course_id')
    },
    department() {
        return this.belongsTo('Department', 'department_id')
    }
  }, {
    getAttributes: () => {
      return [
        'id',
        'name',
        'department_id',
        'number',
        'time',
        'semester',
        'professor',
        'classroom_id',
        'created_at',
        'updated_at'
      ];
    }
  });

module.exports = bookshelf.model('Course', Course);
