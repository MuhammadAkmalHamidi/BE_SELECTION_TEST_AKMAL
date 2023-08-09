'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class salaries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      salaries.belongsTo(models.user)
    }
  }
  salaries.init({
    salary: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'salaries',
  });
  return salaries;
};