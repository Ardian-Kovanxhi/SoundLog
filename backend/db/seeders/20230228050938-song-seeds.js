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
        userId: 5,
        name: 'Comfortably Numb',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1680483308836.mp3',
        duration: 542,
        img: 'https://i.scdn.co/image/ab67616d0000b2735d48e2f56d691f9a4e4b0bdf',
        description: 'live performance of a legendary song'
      },
      {
        userId: 6,
        name: 'Call it fate call it karma',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1680483364313.mp3',
        duration: 204,
        img: 'https://cdns-images.dzcdn.net/images/cover/2a3dd157147fd016e080d1aa78c593ef/264x264.jpg',
        description: null
      },
      {
        userId: 7,
        name: 'I Bet You Look Good On The Dancefloor',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1691686976332.mp3',
        duration: 174,
        img: 'https://m.media-amazon.com/images/I/61FUSgm2AgL._UF1000,1000_QL80_.jpg',
        description: null
      },
      {
        userId: 8,
        name: 'Ode to Viceroy',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690258948596.mp3',
        duration: 234,
        img: 'https://m.media-amazon.com/images/I/81D8Ok3XMhL._UF1000,1000_QL80_.jpg',
        description: null
      },
      {
        userId: 9,
        name: 'Instant Crush',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690301002405.mp3',
        duration: 339,
        img: 'https://media.pitchfork.com/photos/63f641d801dbe796fab80055/master/w_1280%2Cc_limit/Daft-Punk-Random-Access-Memories.jpg',
        description: null
      },
      {
        userId: 10,
        name: 'SLOW DANCING IN THE DARK',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690301089615.mp3',
        duration: 209,
        img: 'https://thefader-res.cloudinary.com/private_images/w_760,c_limit,f_auto,q_auto:best/joji_press_image_sdp1l8/joji-north-american-tour-glimpse-of-us.jpg',
        description: null
      },
      {
        userId: 11,
        name: "Since I've Been Loving You",
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690301222005.mp3',
        duration: 488,
        img: 'https://extrachill.com/wp-content/uploads/2021/03/led-zeppelin-angel-logo.jpeg',
        description: null
      },
      {
        userId: 12,
        name: "Satisfaction",
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1702401398908.mp3',
        duration: 285,
        img: 'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/a4/f3/ea/a4f3eac5-cd50-4365-efd8-1f6951a22356/00602527040752.rgb.jpg/1200x1200bf-60.jpg',
        description: null
      },
      {
        userId: 13,
        name: 'Stylo',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690301328111.mp3',
        duration: 271,
        img: 'https://m.media-amazon.com/images/I/71lix6+VfWL._UF1000,1000_QL80_.jpg',
        description: null
      },
      {
        userId: 14,
        name: 'Muscle Museum',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690301377211.mp3',
        duration: 263,
        img: 'https://m.media-amazon.com/images/I/71kN8laMZbL._UF1000,1000_QL80_.jpg',
        description: null
      },
      {
        userId: 15,
        name: 'Fuel',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690302075499.mp3',
        duration: 269,
        img: 'https://cdn.media.amplience.net/i/metallica/reload_cover?fmt=auto&maxW=1050',
        description: null
      },
      {
        userId: 16,
        name: 'Lady Evil',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690302291199.mp3',
        duration: 263,
        img: 'https://m.media-amazon.com/images/I/71y8IkqMGtL._UF1000,1000_QL80_.jpg',
        description: null
      },
      {
        userId: 6,
        name: "Why Are Sunday's So Depressing",
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690302428705.mp3',
        duration: 277,
        img: 'https://m.media-amazon.com/images/I/91PbdrEjhaL._UF1000,1000_QL80_.jpg',
        description: null
      },
      {
        userId: 17,
        name: 'Pyramid Song',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690302506104.mp3',
        duration: 289,
        img: 'https://cdn.theatlantic.com/thumbor/1JDudCkfR7jwWW_hya_ZIGdLhV4=/444x138:2694x2388/1080x1080/media/img/mt/2021/06/artworks_AEUZPcuuIEgfqYbw_syqOSA_t3000x3000/original.jpg',
        description: null
      },
      {
        userId: 18,
        name: 'Layla',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690302647605.mp3',
        duration: 423,
        img: 'https://e.snmc.io/i/600/s/8ed126d701eb838b86808bdc87bc3922/1210092/derek-and-the-dominos-layla-and-other-assorted-love-songs-cover-art.jpg',
        description: null
      },
      {
        userId: 19,
        name: 'Heart Shaped Box',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690302694099.mp3',
        duration: 278,
        img: 'https://m.media-amazon.com/images/I/81o5RZfWzwL._UF1000,1000_QL80_.jpg',
        description: null
      },
      {
        userId: 5,
        name: 'Wish You Were Here',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690302769905.mp3',
        duration: 321,
        img: 'https://m.media-amazon.com/images/I/71m0ofUWYXL._UF1000,1000_QL80_.jpg',
        description: null
      },
      {
        userId: 20,
        name: 'Cubensis Lenses',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690303073398.mp3',
        duration: 343,
        img: 'https://f4.bcbits.com/img/a3335171517_65',
        description: null
      },
      {
        userId: 21,
        name: 'Moving Out',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690303153575.mp3',
        duration: 212,
        img: 'https://m.media-amazon.com/images/I/71cF66uUR4L._UF1000,1000_QL80_.jpg',
        description: null
      },
      {
        userId: 22,
        name: 'This Night Has Opened My Eyes',
        content: 'https://aa-sounclod-clone-bucket.s3.amazonaws.com/1691687004043.mp3',
        duration: 221,
        img: 'https://i.ebayimg.com/images/g/pHYAAOSwedBjthI1/s-l1600.jpg',
        description: null
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
