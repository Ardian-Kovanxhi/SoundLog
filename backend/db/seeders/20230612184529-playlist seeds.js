'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Playlists';

    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        name: 'Filler Name 1',
        description: 'Blah blah blah 1'
      },
      {
        userId: 2,
        name: 'Filler Name 2',
        description: 'Blah blah blah 2'
      },
      {
        userId: 3,
        name: 'Filler Name 3',
        description: 'Blah blah blah 3'
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Playlists';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
