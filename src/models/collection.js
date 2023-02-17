module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define(
    'Collection',
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
  Collection.associate = (models) => {
    Collection.hasMany(models.Artefact, {
      as: 'collections',
      foreignKey: 'collectionId'
    });
  };
  return Collection;
};
