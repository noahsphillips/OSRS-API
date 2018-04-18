let bookshelf = require('../lib/db'),
  Classroom = bookshelf.Model.extend({
    tableName: 'classrooms',
    hasTimestamps: true,
    building() {
      return this.belongsTo('Building', 'building_id')
    }
  }, {
    getAttributes: () => {
      return [
        'id',
        'room_number',
        'building_id',
        'created_at',
        'updated_at'
      ];
    }
  });

module.exports = bookshelf.model('Classroom', Classroom);
