module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ArtefactFavorites', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    artefactId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Artefacts',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    favoriteId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Favorites',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('ArtefactFavorites')
};
