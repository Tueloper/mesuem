module.exports = (sequelize, DataTypes) => {
  const ArtefactFavorite = sequelize.define('ArtefactFavorite', {
    artefactId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Artefact',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    favoriteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Favorite',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {});
  ArtefactFavorite.associate = function (models) {
    // associations can be defined here
  };
  return ArtefactFavorite;
};
