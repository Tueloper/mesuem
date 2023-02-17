module.exports = (sequelize, DataTypes) => {
  const Artefact = sequelize.define('Artefact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    collectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Collection',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Location',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {});
  Artefact.associate = (models) => {
    Artefact.belongsTo(models.Location, {
      as: 'location',
      foreignKey: 'locationId'
    });
    Artefact.belongsTo(models.Collection, {
      as: 'collection',
      foreignKey: 'collectionId'
    });
  };
  return Artefact;
};
