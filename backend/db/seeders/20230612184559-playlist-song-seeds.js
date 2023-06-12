'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'PlaylistSongs';

    return queryInterface.bulkInsert(options, [
      {
        playlistId: 1,
        songId: 1
      },
      {
        playlistId: 1,
        songId: 2
      },
      {
        playlistId: 1,
        songId: 3
      },
      {
        playlistId: 1,
        songId: 4
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'PlaylistSongs';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      playlistId: { [Op.in]: [1] }
    }, {});
  }
};
