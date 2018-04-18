let bookshelf = require('../lib/db'),
  Hold = bookshelf.Model.extend({
    tableName: 'holds',
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
        'semester',
        'reason',
        'created_at',
        'updated_at'
      ];
    }
  });

module.exports = bookshelf.model('Hold', Hold);
