"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  todo.init(
    {
      activity_group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Activity group id is required",
          },
          notEmpty: {
            args: true,
            msg: "Activity group id cannot be empty",
          },
          isInt: {
            args: true,
            msg: "Activity group id must be an integer value",
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "title is required",
          },
          notEmpty: {
            args: true,
            msg: "title cannot be empty",
          },
        },
      },
      is_actived: DataTypes.BOOLEAN,
      priority: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Very Low", "Low", "Medium", "High", "Very High"],
        validate: {
          notNull: {
            msg: "Prioroty is required",
          },
          notEmpty: {
            args: true,
            msg: "Prioroty cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "todo",
    }
  );
  return todo;
};
