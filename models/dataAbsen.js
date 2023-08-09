'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dataAbsen extends Model {
    static associate(models) {
      dataAbsen.belongsTo(models.user)
    }
  }
  dataAbsen.init({
    clockIn: {
      type : DataTypes.DATE,
      allowNull: true
    },
    clockOut: {
      type : DataTypes.DATE,
      allowNull: true
    },
    dailySalary : {
      type : DataTypes.INTEGER,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'dataAbsen',
  });
  return dataAbsen;
};