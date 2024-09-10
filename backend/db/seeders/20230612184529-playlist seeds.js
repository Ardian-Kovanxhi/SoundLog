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
        userId: 2,
        name: "Live Performances",
      },
      {
        userId: 5,
        name: "Wish You Were Here",
        coverImg: "https://upload.wikimedia.org/wikipedia/en/d/d6/Pink_Floyd_-_all_members.jpg",
      },
      {
        userId: 6,
        name: "Comedown Machine",
        coverImg: "https://i.scdn.co/image/ab67616100005174c3b137793230f4043feb0089",
      },
      {
        userId: 7,
        name: "Whatever People Say I Am, That's What I'm Not",
      },
      {
        userId: 8,
        name: "2",
      },
      {
        userId: 9,
        name: "Random Access Memories",
      },
      {
        userId: 11,
        name: "Presence",
      },
      {
        userId: 13,
        name: "Plastic Beach",
      },
      {
        userId: 14,
        name: "Showbiz",
      },
      {
        userId: 15,
        name: "Kill 'Em All",
      },
      {
        userId: 6,
        name: "The New Abnormal",
      },
      {
        userId: 17,
        name: "Amnesiac",
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
