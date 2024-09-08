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
        coverImg: "https://upload.wikimedia.org/wikipedia/en/d/d6/Pink_Floyd_-_all_members.jpg",
      },
      {
        userId: 5,
        name: 'The Strokes Sample PLaylist',
        coverImg: "https://i.scdn.co/image/ab67616100005174c3b137793230f4043feb0089",
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
