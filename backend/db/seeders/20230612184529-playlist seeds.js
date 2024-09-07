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
        userId: 6,
        name: 'Pink Floyd Sample Playlist',
      },
      {
        userId: 5,
        name: 'The Strokes Sample PLaylist',
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Playlists';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2] }
    }, {});
  }
};
