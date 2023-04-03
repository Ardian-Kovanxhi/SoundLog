'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Songs';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        name: 'Comfortably Numb',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1680483308836.mp3',
        img: 'https://i.scdn.co/image/ab67616d0000b2735d48e2f56d691f9a4e4b0bdf',
        description: 'live performance of a legendary song'
      },
      {
        userId: 1,
        name: 'Call it fate call it karma',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1680483364313.mp3',
        img: 'https://cdns-images.dzcdn.net/images/cover/2a3dd157147fd016e080d1aa78c593ef/264x264.jpg',
        description: null
      },
      {
        userId: 2,
        name: "Gary's Song",
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1680484080763.mp3',
        img: 'https://i.kym-cdn.com/photos/images/newsfeed/002/213/963/293.jpg',
        description: 'what a shame'
      },
      {
        userId: 3,
        name: 'YES',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1680486801511.mp3',
        img: 'https://le717.github.io/yeeeeeeeeeeeeeees/yes.jpg',
        description: 'YES'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Songs';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['name', 'name2', 'name3'] }
    }, {});
  }
};
