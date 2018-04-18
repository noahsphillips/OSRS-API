let bookshelf = require('../lib/db'),
  Session = bookshelf.Model.extend({
    tableName: 'user_sessions',
    hasTimestamps: true,
    user() {
      return this.belongsTo('User', 'user_id')
    }
  }, {
    getAttributes: () => {
      return [
        'id',
        'isValid',
        'user_id',
        'token',
        'created_at',
        'updated_at'
      ];
    }
  });

module.exports = bookshelf.model('Session', Session);
