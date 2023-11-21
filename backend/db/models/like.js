'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Like.belongsTo(models.User, { foreignKey: 'userId' })
      Like.belongsTo(models.Song, { foreignKey: 'songId' })
    }
  }
  Like.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Like',
    defaultScope: {
      attributes: {
        exclude: ['userId', 'songId', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      allUserLikes: {
        attributes: {
          exclude: ['id', 'userId']
        }
      }
    }
  });
  return Like;
};