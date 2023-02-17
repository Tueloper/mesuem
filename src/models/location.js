module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'Location',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
    },
    {}
  );
  Location.associate = (models) => {
    Location.hasMany(models.Artefact, {
      as: 'locations',
      foreignKey: 'locationId'
    });
  };
  return Location;
};
