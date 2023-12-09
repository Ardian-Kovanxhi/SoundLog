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
        userId: 2,
        songId: 1,
        userSongHash: '2-1'
      },
      {
        userId: 3,
        songId: 1,
        userSongHash: '3-1'
      },
      {
        userId: 4,
        songId: 1,
        userSongHash: '4-1'
      },
      {
        userId: 2,
        songId: 2,
        userSongHash: '2-2'
      },
      {
        userId: 3,
        songId: 2,
        userSongHash: '3-2'
      },
      {
        userId: 2,
        songId: 3,
        userSongHash: '2-3'
      },
      {
        userId: 2,
        songId: 4,
        userSongHash: '2-4'
      },
      {
        userId: 6,
        songId: 3,
        userSongHash: '6-3'
      },
      {
        userId: 6,
        songId: 4,
        userSongHash: '6-4'
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
