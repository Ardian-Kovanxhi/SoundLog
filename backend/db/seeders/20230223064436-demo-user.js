'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Admin',
        lastName: 'Owner',
        email: 'admin@owner.com',
        username: 'admin',
        hashedPassword: bcrypt.hashSync('RealPassOwner1!')
      },
      {
        firstName: 'Demo1',
        lastName: 'User',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicture: 'https://images.pushsquare.com/0096e1b088b8c/fallout-4-vault-boy-annoyed.900x.jpg',
        backgroundPicture: 'https://cdn.discordapp.com/attachments/750805294358986783/1188525693198413924/maxresdefault.jpg?ex=659ad7ce&is=658862ce&hm=8799e182993c858ea023e52286c2508dff5805e1fb21ee9f19c158b065568fac&'
      },
      {
        firstName: 'Demo2',
        lastName: 'User',
        email: 'user1@user.io',
        username: 'Paparrr',
        hashedPassword: bcrypt.hashSync('password2'),
        profilePicture: 'https://images.pushsquare.com/0096e1b088b8c/fallout-4-vault-boy-annoyed.900x.jpg',
        backgroundPicture: 'https://cdn.discordapp.com/attachments/750805294358986783/1188525693198413924/maxresdefault.jpg?ex=659ad7ce&is=658862ce&hm=8799e182993c858ea023e52286c2508dff5805e1fb21ee9f19c158b065568fac&'
      },
      {
        firstName: 'Demo3',
        lastName: 'User',
        email: 'user2@user.io',
        username: 'VICT0RYSCR33CH',
        hashedPassword: bcrypt.hashSync('password3'),
        profilePicture: 'https://images.pushsquare.com/0096e1b088b8c/fallout-4-vault-boy-annoyed.900x.jpg',
        backgroundPicture: 'https://cdn.discordapp.com/attachments/750805294358986783/1188525693198413924/maxresdefault.jpg?ex=659ad7ce&is=658862ce&hm=8799e182993c858ea023e52286c2508dff5805e1fb21ee9f19c158b065568fac&'
      },
      {
        firstName: 'David',
        lastName: 'Gilmour',
        email: 'PinkFloyd@artist.io',
        username: 'Pink Floyd',
        hashedPassword: bcrypt.hashSync('ShineOn'),
        profilePicture: 'https://cdn.britannica.com/64/23164-050-A7D2E9D9/Pink-Floyd.jpg',
        backgroundPicture: 'https://cdn.discordapp.com/attachments/750805294358986783/1189718864544682105/prism_by_octoplad_dcsrb8f-fullview.png?ex=659f2f09&is=658cba09&hm=ec64337b6bb812895ef3655640593fcba8672daa51ec1cdca1b284a0f1acf471&'
      },
      {
        firstName: 'Julian',
        lastName: 'Casablancas',
        email: 'TheStrokes@artist.io',
        username: 'The Strokes',
        hashedPassword: bcrypt.hashSync('TakeItLeaveIt'),
        profilePicture: 'https://dl6pgk4f88hky.cloudfront.net/2021/08/2021_29_the_strokes_new-scaled.jpg',
        backgroundPicture: 'https://cultrecords.com/cdn/shop/articles/labelnews-2_1920x.jpg?v=1599708174'
      },
      {
        firstName: 'Alex',
        lastName: 'Turner',
        email: 'ArcticMonkeys@artist.io',
        username: 'Arctic Monkeys',
        hashedPassword: bcrypt.hashSync('RUMine'),
        profilePicture: 'https://miro.medium.com/v2/resize:fit:1200/0*3NHQ-ULx3YqOlPzP.png',
        backgroundPicture: 'https://cdn.discordapp.com/attachments/750805294358986783/1187222324009783316/am-2.png?ex=659619f3&is=6583a4f3&hm=d030dc98ea167ed81713451e35b5f24aa1cfc27ba5013c83457d08bfd3a72d81&'
      },
      {
        firstName: 'MacBriare',
        lastName: 'DeMarco',
        email: 'MacDeMarco@artist.io',
        username: 'Mac DeMarco',
        hashedPassword: bcrypt.hashSync('FreakedNeighbor'),
        profilePicture: 'https://nelsonvillefest.org/wp-content/uploads/2021/03/mac.jpg',
        backgroundPicture: 'https://enajqgm7ox9.exactdn.com/wp-content/uploads/2022/01/mac-demarco-chord-theory.jpg?strip=all&lossy=1&ssl=1'
      },
      {
        firstName: 'Daft',
        lastName: 'Punk',
        email: 'DaftPunk@artist.io',
        username: 'Daft Punk',
        hashedPassword: bcrypt.hashSync('LoseToDance'),
        profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Daft_Punk_in_2013.jpg',
        backgroundPicture: 'https://soundation-strapi-production.s3.amazonaws.com/how_to_sample_like_daft_punk_hero_1c1d113d76.jpg'
      },
      {
        firstName: 'George',
        lastName: 'Miller',
        email: 'Joji@artist.io',
        username: 'Joji',
        hashedPassword: bcrypt.hashSync('EyBoss'),
        profilePicture: 'https://www.billboard.com/wp-content/uploads/2020/03/joji-2020-cr-Damien-Maloney-billboard-1548-1585678185.jpg?w=942&h=623&crop=1',
        backgroundPicture: 'https://media.giphy.com/headers/joji/dJZIgW5IKHVA.jpg'
      },
      {
        firstName: 'Robert',
        lastName: 'Plant',
        email: 'LedZeppelin@artist.io',
        username: 'Led Zeppelin',
        hashedPassword: bcrypt.hashSync('HeavenStairway'),
        profilePicture: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/03/13/14/led-zeppelin2.jpg',
        backgroundPicture: 'https://a.storyblok.com/f/101652/1920x1080/34089fd0b4/hero_ledzep_1920x1080.png'
      },
      {
        firstName: 'Song',
        lastName: 'Writer',
        email: 'PushMe@artist.io',
        username: 'Benny Benassi and The Biz',
        hashedPassword: bcrypt.hashSync('ThenTouchMe'),
        profilePicture: 'https://lastfm.freetls.fastly.net/i/u/ar0/fd5e1892e95e4ed5b512614ca57ed8dd.jpg',
        backgroundPicture: null
      },
      {
        firstName: 'Damon',
        lastName: 'Albarn',
        email: 'Gorillaz@artist.io',
        username: 'Gorillaz',
        hashedPassword: bcrypt.hashSync('ItsDare'),
        profilePicture: 'https://lamag.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTk3NTU1NTA2ODMwNzgwMDk2/gorillaz-la-concert-2-d.jpg',
        backgroundPicture: 'https://indie-mag.com/wp-content/uploads/2021/05/fp.gorillaz.lineup.black_-scaled.jpg'
      },
      {
        firstName: 'Matt',
        lastName: 'Bellamy',
        email: 'Muse@artist.io',
        username: 'Muse',
        hashedPassword: bcrypt.hashSync('PlugInBaby'),
        profilePicture: 'https://www.riffyou.com/wp-content/uploads/2015/04/muse-2105.jpg',
        backgroundPicture: 'https://cdn.discordapp.com/attachments/750805294358986783/1189718857884110979/d6fchs-89e0675b-d112-4e4e-9943-411fe15af96e.jpg?ex=659f2f07&is=658cba07&hm=caf913584ec220b7ce153c4cd4febe1abee163aecd0b1a02fc39ef5ac3b8f92f&'
      },
      {
        firstName: 'James',
        lastName: 'Hetfield',
        email: 'Metallica@artist.io',
        username: 'Metallica',
        hashedPassword: bcrypt.hashSync('SeekDestroy'),
        profilePicture: 'https://yt3.googleusercontent.com/KKwingbGa2q2MzNJ3B3tTDC4bNjDX9iMBFPeY_zKBF6Hj_Yh5q-SbShFMxG_takvJIOmUJjcWi8=s900-c-k-c0x00ffffff-no-rj',
        backgroundPicture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Metallica_logo.png/800px-Metallica_logo.png?20211025210909'
      },
      {
        firstName: 'Ronnie',
        lastName: 'Dio',
        email: 'BlackSabbath@artist.io',
        username: 'Black Sabbath',
        hashedPassword: bcrypt.hashSync('IronMan'),
        profilePicture: 'https://www.rollingstone.com/wp-content/uploads/2021/02/Sabbath-Press-Shot-1_Credit_Photo-Duffy-C-Duffy-Archive.jpg?w=1581&h=1054&crop=1',
        backgroundPicture: 'https://i.etsystatic.com/7779796/r/il/934d41/3487699946/il_570xN.3487699946_8v44.jpg'
      },
      {
        firstName: 'Thom',
        lastName: 'Yorke',
        email: 'Radiohead@artist.io',
        username: 'Radiohead',
        hashedPassword: bcrypt.hashSync('NothingToFear'),
        profilePicture: 'https://media.npr.org/assets/img/2019/06/11/gettyimages-80530629-f148b8e014c67ed40c18fa8d2f50aa5ee7d87d67-s1100-c50.jpg',
        backgroundPicture: 'https://cdn.discordapp.com/attachments/750805294358986783/1189718849596170350/radiohead.webp?ex=659f2f05&is=658cba05&hm=11aa89900028164488fcfdb0e1dc98a7f76af6508d629e6e588448daf2a211bb&'
      },
      {
        firstName: 'Song',
        lastName: 'Writer',
        email: 'Derek@artist.io',
        username: 'Derek & The Dominos',
        hashedPassword: bcrypt.hashSync('OnMyKnees'),
        profilePicture: 'https://i1.wp.com/www.thevinyldistrict.com/wp-content/uploads/2017/05/in-concert.jpg?fit=425%2C425&ssl=1',
        backgroundPicture: null
      },
      {
        firstName: 'Kurt',
        lastName: 'Cobain',
        email: 'Nirvana@artist.io',
        username: 'Nirvana',
        hashedPassword: bcrypt.hashSync('Nevermind'),
        profilePicture: 'https://yt3.googleusercontent.com/zXjmd_yOxkfNK-D9p94PnsxL_ib-CukrlIXa38Zr6rogybrZr3cZyYjQXE9VePaB_7NWiQFLA_k=s900-c-k-c0x00ffffff-no-rj',
        backgroundPicture: 'https://cdn.vox-cdn.com/thumbor/bdlOBPCJmGSsCDApfDVrzTBuqNo=/0x0:2400x1257/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/22873758/TheRinger_Nirvana_Final.jpeg'
      },
      {
        firstName: 'Jack',
        lastName: 'McEwan',
        email: 'Crumpets@artist.io',
        username: 'Psychedelic Porn Crumpets',
        hashedPassword: bcrypt.hashSync('horridName'),
        profilePicture: 'https://readdork.com/wp-content/uploads/2021/10/Psychedelic-Porn-Crumpets-2021-01-Tristan-Mckenzie.jpg',
        backgroundPicture: 'https://i.ytimg.com/vi/gaAxJ2dzBwI/maxresdefault.jpg'
      },
      {
        firstName: 'Billy',
        lastName: 'Joel',
        email: 'Billy@artist.io',
        username: 'Billy Joel',
        hashedPassword: bcrypt.hashSync('PianoMan'),
        profilePicture: 'https://townsquare.media/site/295/files/2014/10/2024496.jpg?w=980&q=75',
        backgroundPicture: 'https://images.saatchiart.com/saatchi/1811723/art/8528235/7592178-HSC00001-7.jpg'
      },
      {
        firstName: 'Steven',
        lastName: 'Morrissey',
        email: 'Smith@artist.io',
        username: 'The Smiths',
        hashedPassword: bcrypt.hashSync('MiserableHeaven'),
        profilePicture: 'https://cdn.britannica.com/17/23017-004-C0102DE8/The-Smiths.jpg',
        backgroundPicture: 'https://www.uncut.co.uk/wp-content/uploads/2015/05/smithssongsnew-scaled.jpg'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] }
    }, {});
  }
};