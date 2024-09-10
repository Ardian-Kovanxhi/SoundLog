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
        playlistId: 1, //Live
        songId: 1
      },
      {
        playlistId: 1, //Live
        songId: 7
      },
      {
        playlistId: 2, //Wish
        songId: 21
      },
      {
        playlistId: 2, //Wish
        songId: 24
      },
      {
        playlistId: 2, //Wish
        songId: 23
      },
      {
        playlistId: 2, //Wish
        songId: 17
      },
      {
        playlistId: 2, //Wish
        songId: 22
      },
      {
        playlistId: 3, //Comedown
        songId: 2
      },
      {
        playlistId: 4, //Whatever
        songId: 3
      },
      {
        playlistId: 5, //2
        songId: 4
      },
      {
        playlistId: 6, //RAM
        songId: 5
      },
      // {
      //   playlistId: 7, //Presence
      //   songId: 0
      // },
      {
        playlistId: 8, //Plastic
        songId: 9
      },
      {
        playlistId: 9, //Show
        songId: 10
      },
      // {
      //   playlistId: 10, //Kill
      //   songId: 0
      // },
      {
        playlistId: 11,//Abnormal
        songId: 13
      },
      {
        playlistId: 12,//Amnesiac
        songId: 14
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
