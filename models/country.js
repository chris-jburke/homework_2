'use strict';
module.exports = (sequelize, DataTypes) => {
  const country = sequelize.define('country', {
    name: DataTypes.TEXT,
    population: DataTypes.INTEGER,
    code: DataTypes.TEXT
  }, {});
  country.associate = function(models) {
    // associations can be defined here
  };
  return country;
};