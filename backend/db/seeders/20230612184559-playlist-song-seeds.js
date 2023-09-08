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
        playlistId: 2,
        songId: 2
      },
      {
        playlistId: 1,
        songId: 17
      },
      {
        playlistId: 2,
        songId: 5
      },
      {
        playlistId: 2,
        songId: 13
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'PlaylistSongs';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      playlistId: { [Op.in]: [1, 2] }
    }, {});
  }
};
