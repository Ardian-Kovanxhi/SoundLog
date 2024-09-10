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
        coverImg: "https://voodooneon.com/cdn/shop/files/live-music-multi-color.jpg?v=1699924331&width=1066"
      },
      {
        userId: 5,
        name: "Wish You Were Here",
        coverImg: "https://m.media-amazon.com/images/I/71m0ofUWYXL._UF1000,1000_QL80_.jpg",
      },
      {
        userId: 6,
        name: "Comedown Machine",
        coverImg: "https://m.media-amazon.com/images/I/61QxSFvJVNL._UF1000,1000_QL80_.jpg",
      },
      {
        userId: 7,
        name: "Whatever People Say I Am, That's What I'm Not",
        coverImg: "https://www.dominomusic.com/res/18Z3/1200_1200/6tj62kv3g4.png"
      },
      {
        userId: 8,
        name: "2",
        coverImg: "https://beatsperminute.com/wp-content/uploads/2012/10/macdemarco2-Cover_300dpi.jpeg"
      },
      {
        userId: 9,
        name: "Random Access Memories",
        coverImg: "https://media.pitchfork.com/photos/63f641d801dbe796fab80055/master/w_1280%2Cc_limit/Daft-Punk-Random-Access-Memories.jpg"
      },
      {
        userId: 11,
        name: "Presence",
        coverImg: "https://m.media-amazon.com/images/I/71K2f2-jRLL._UF1000,1000_QL80_.jpg"
      },
      {
        userId: 13,
        name: "Plastic Beach",
        coverImg: "https://m.media-amazon.com/images/I/81wf6ViZxuL._UF1000,1000_QL80_.jpg"
      },
      {
        userId: 14,
        name: "Showbiz",
        coverImg: "https://m.media-amazon.com/images/I/71kN8laMZbL._UF1000,1000_QL80_.jpg"
      },
      {
        userId: 15,
        name: "Kill 'Em All",
        coverImg: "https://m.media-amazon.com/images/I/71LExQVFRRL._UF1000,1000_QL80_.jpg"
      },
      {
        userId: 6,
        name: "The New Abnormal",
        coverImg: "https://m.media-amazon.com/images/I/91PbdrEjhaL._UF1000,1000_QL80_.jpg"
      },
      {
        userId: 17,
        name: "Amnesiac",
        coverImg: "https://m.media-amazon.com/images/I/71kEucXSNML._UF1000,1000_QL80_.jpg"
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
