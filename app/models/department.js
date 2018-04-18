let bookshelf = require('../lib/db'),
  Department = bookshelf.Model.extend({
    tableName: 'departments',
    hasTimestamps: true,
    deptHead() {
      return this.belongsTo('User', 'user_id')
    },
    courses() {
        return this.hasMany('Course', 'department_id')
    }
  }, {
    getAttributes: () => {
      return [
        'id',
        'name',
        'user_id',
        'name',
        'created_at',
        'updated_at'
      ];
    }
  });

module.exports = bookshelf.model('Department', Department);
