'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Likes';

    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        songId: 1
      },
      {
        userId: 1,
        songId: 2
      },
      {
        userId: 1,
        songId: 3
      },
      {
        userId: 1,
        songId: 4
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Likes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1] }
    }, {});
  }
};
