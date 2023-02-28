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
        name: 'name',
        content: 'sample.url',
        img: 'img.url',
        description: 'this is a sample description'
      },
      {
        userId: 2,
        name: 'name2',
        content: 'sample2.url',
        img: 'img2.url',
        description: 'this is a sample description2'
      },
      {
        userId: 3,
        name: 'name3',
        content: 'sample3.url',
        img: 'img3.url',
        description: 'this is a sample description3'
      }
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
