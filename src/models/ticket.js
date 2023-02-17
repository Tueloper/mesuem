module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    paystackReference: {
      type: DataTypes.STRING,
      allowNull: true
    },
    paystackStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    ticketCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dateOfEntry: {
      type: DataTypes.STRING,
      allowNull: true
    },
    verifiedTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    verifiedDate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    booked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
  }, {});
  Ticket.associate = (models) => {
    // associations can be defined here
    Ticket.belongsTo(models.User, {
      as: 'ticket',
      foreignKey: 'userId'
    });
  };
  return Ticket;
};
