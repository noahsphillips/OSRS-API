let bookshelf = require('../lib/db'),
  User = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,
    holds() {
      return this.hasMany('Hold', 'user_id')
    },
    sessions(){
      return this.hasMany('Session','user_id')
    },
    course() {
        return this.belongsToMany('Course', 'user_courses', 'user_id')
    },
    grades() {
        return this.hasMany('Grade', 'user_id')
    }
  }, {
    getAttributes: () => {
      return [
        'id',
        'first_name',
        'last_name',
        'username',
        'password',
        'role',
        'birthday',
        'address',
        'created_at',
        'updated_at'
      ];
    }
  });

module.exports = bookshelf.model('User', User);
