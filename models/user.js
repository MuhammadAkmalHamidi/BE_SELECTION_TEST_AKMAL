'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasMany(models.dataAbsen)
      user.belongsTo(models.role)
      user.hasOne(models.salaries)
      user.hasOne(models.jadwal)
    }
  }
  user.init({
    name : {
      type : DataTypes.STRING,
      allowNull : false,
    },
    email:{
      type : DataTypes.STRING,
      allowNull : false,
    },
    password: DataTypes.STRING,
    phoneNumber : {
      type : DataTypes.STRING,
      allowNull : false,
    },
    birthDay:{
      type: DataTypes.DATEONLY,
      allowNull: false      
    }
  }, {
    sequelize,
    modelName: 'user'
  });
  return user;
};