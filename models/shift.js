'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      shift.hasMany(models.dataAbsen)
      shift.hasMany(models.jadwal)
    }
  }
  shift.init({
    shift: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'shift',
    timestamps: false
  });
  return shift;
};