'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Playlist.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' })
      // Playlist.hasMany(models.PlaylistSong, { foreignKey: 'playlistId', onDelete: 'CASCADE' })
    }
  }
  Playlist.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    coverImg: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};