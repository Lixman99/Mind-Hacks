const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create a new Sequelize model for reservations
class Reservation extends Model {}

Reservation.init(
  {
    reservationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    carId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cars',
        key: 'car_id',
      },
    },
    customerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'customers',
        key: 'customer_id',
      },
    },
    pickup: {
      type: DataTypes.DATE
    },
    return: {
      type: DataTypes.DATE
    },
    price: {
      type: DataTypes.DECIMAL
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'reservation'
  }
);

module.exports = Reservation;
