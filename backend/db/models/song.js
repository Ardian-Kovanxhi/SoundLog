'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' })
      Song.hasMany(models.Comment, { foreignKey: 'songId', onDelete: 'CASCADE' })
      Song.hasMany(models.Like, { foreignKey: 'songId', onDelete: 'CASCADE' })
      Song.hasMany(models.PlaylistSong, { foreignKey: 'songId' })
    }
  }
  Song.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};