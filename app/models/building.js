let bookshelf = require('../lib/db'),
  Building = bookshelf.Model.extend({
    tableName: 'buildings',
    hasTimestamps: true
  }, {
    getAttributes: () => {
      return [
        'id',
        'building_name',
        'building_number',
        'created_at',
        'updated_at'
      ];
    }
  });

module.exports = bookshelf.model('Building', Building);
