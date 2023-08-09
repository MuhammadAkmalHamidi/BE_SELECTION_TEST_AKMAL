'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      role.belongsTo(models.user)
    }
  }
  role.init({
    roleName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'role',
    timestamps: false
  });
  return role;
};