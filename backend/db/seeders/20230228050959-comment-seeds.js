'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Comments';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        songId: 1,
        comment: 'this is a sample comment'
      },
      {
        userId: 2,
        songId: 2,
        comment: 'this is a sample comment2'
      },
      {
        userId: 3,
        songId: 3,
        comment: 'this is a sample comment3'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Comments';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      comment: {
        [Op.in]: [
          'this is a sample comment',
          'this is a sample comment2',
          'this is a sample comment3'
        ]
      }
    }, {});
  }
};