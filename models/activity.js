'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  activity.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email cannot be null'
        },
        notEmpty: {
          args: true,
          msg: "Email cannot be empty",
        },
        isEmail: {
          args: true,
          msg: "Format email is not valid"
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'title cannot be null'
        },
        notEmpty: {
          args: true,
          msg: "title cannot be empty",
        }
      }
    },
  }, {
    sequelize,
    modelName: 'activity',
  });
  return activity;
};