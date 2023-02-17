module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Tickets', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    paystackReference: {
      type: Sequelize.STRING,
      allowNull: true
    },
    paystackStatus: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    price: {
      type: Sequelize.STRING,
      allowNull: true
    },
    quantity: {
      type: Sequelize.STRING,
      allowNull: true
    },
    verified: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    ticketCode: {
      type: Sequelize.STRING,
      allowNull: true
    },
    dateOfEntry: {
      type: Sequelize.STRING,
      allowNull: true
    },
    verifiedTime: {
      type: Sequelize.STRING,
      allowNull: true
    },
    verifiedDate: {
      type: Sequelize.STRING,
      allowNull: true
    },
    booked: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
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
  down: (queryInterface) => queryInterface.dropTable('Tickets')
};
