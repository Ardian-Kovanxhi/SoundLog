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
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Demo2',
        lastName: 'User',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Demo3',
        lastName: 'User',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'David',
        lastName: 'Gilmour',
        email: 'PinkFloyd@artist.io',
        username: 'Pink Floyd',
        hashedPassword: bcrypt.hashSync('ShineOn')
      },
      {
        firstName: 'Julian',
        lastName: 'Casablancas',
        email: 'TheStrokes@artist.io',
        username: 'The Strokes',
        hashedPassword: bcrypt.hashSync('TakeItLeaveIt')
      },
      {
        firstName: 'Alex',
        lastName: 'Turner',
        email: 'ArcticMonkeys@artist.io',
        username: 'Arctic Monkeys',
        hashedPassword: bcrypt.hashSync('RUMine')
      },
      {
        firstName: 'MacBriare',
        lastName: 'DeMarco',
        email: 'MacDeMarco@artist.io',
        username: 'Mac DeMarco',
        hashedPassword: bcrypt.hashSync('FreakedNeighbor')
      },
      {
        firstName: 'Daft',
        lastName: 'Punk',
        email: 'DaftPunk@artist.io',
        username: 'Daft Punk',
        hashedPassword: bcrypt.hashSync('LoseToDance')
      },
      {
        firstName: 'George',
        lastName: 'Miller',
        email: 'Joji@artist.io',
        username: 'Joji',
        hashedPassword: bcrypt.hashSync('EyBoss')
      },
      {
        firstName: 'Robert',
        lastName: 'Plant',
        email: 'LedZeppelin@artist.io',
        username: 'Led Zeppelin',
        hashedPassword: bcrypt.hashSync('HeavenStairway')
      },
      {
        firstName: 'Song',
        lastName: 'Writer',
        email: 'Spongebob@artist.io',
        username: 'SpongeBob',
        hashedPassword: bcrypt.hashSync('UnderseaJams')
      },
      {
        firstName: 'Damon',
        lastName: 'Albarn',
        email: 'Gorillaz@artist.io',
        username: 'Gorillaz',
        hashedPassword: bcrypt.hashSync('ItsDare')
      },
      {
        firstName: 'Matt',
        lastName: 'Bellamy',
        email: 'Muse@artist.io',
        username: 'Muse',
        hashedPassword: bcrypt.hashSync('PlugInBaby')
      },
      {
        firstName: 'James',
        lastName: 'Hetfield',
        email: 'Metallica@artist.io',
        username: 'Metallica',
        hashedPassword: bcrypt.hashSync('SeekDestroy')
      },
      {
        firstName: 'Ronnie',
        lastName: 'Dio',
        email: 'BlackSabbath@artist.io',
        username: 'Black Sabbath',
        hashedPassword: bcrypt.hashSync('IronMan')
      },
      {
        firstName: 'Thom',
        lastName: 'Yorke',
        email: 'Radiohead@artist.io',
        username: 'Radiohead',
        hashedPassword: bcrypt.hashSync('NothingToFear')
      },
      {
        firstName: 'Song',
        lastName: 'Writer',
        email: 'Derek@artist.io',
        username: 'Derek & The Dominos',
        hashedPassword: bcrypt.hashSync('OnMyKnees')
      },
      {
        firstName: 'Kurt',
        lastName: 'Cobain',
        email: 'Nirvana@artist.io',
        username: 'Nirvana',
        hashedPassword: bcrypt.hashSync('Nevermind')
      },
      {
        firstName: 'Jack',
        lastName: 'McEwan',
        email: 'Crumpets@artist.io',
        username: 'Psychedelic Porn Crumpets',
        hashedPassword: bcrypt.hashSync('horridName')
      },
      {
        firstName: 'Billy',
        lastName: 'Joel',
        email: 'Billy@artist.io',
        username: 'Billy Joel',
        hashedPassword: bcrypt.hashSync('PianoMan')
      },
      {
        firstName: 'Steven',
        lastName: 'Morrissey',
        email: 'Smith@artist.io',
        username: 'The Smiths',
        hashedPassword: bcrypt.hashSync('MiserableHeaven')
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