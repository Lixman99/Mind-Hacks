const User = require('./User');
const Car = require('./Car');
const Reservation = require('./Reservation');

Car.hasMany(Reservation, {
  foreignKey: 'car_id',
});

Reservation.belongsTo(Car, {
  foreignKey: 'car_id',
});

module.exports = { User, Car, Reservation };
