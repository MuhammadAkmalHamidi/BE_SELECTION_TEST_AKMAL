'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jadwal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      jadwal.belongsTo(models.user)
      jadwal.belongsTo(models.shift)
    }
  }
  jadwal.init({
  }, {
    sequelize,
    modelName: 'jadwal',
    timestamps: false
  });
  return jadwal;
};