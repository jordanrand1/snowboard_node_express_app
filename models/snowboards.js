'use strict';
module.exports = (sequelize, DataTypes) => {
  const Snowboards = sequelize.define('Snowboards', {
    brand: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING
  }, {});
  Snowboards.associate = function(models) {
    // associations can be defined here
  };
  return Snowboards;
};