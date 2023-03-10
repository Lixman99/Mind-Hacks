const Reservation = require('./Reservation');
const Customer = require('./Customer');
const Car = require('./Car');

Reservation.belongsTo(Customer, {
  foreignKey: 'customer_id'
});

Customer.hasMany(Reservation, {
  foreignKey: 'customer_id'
});

Reservation.belongsTo(Car, {
  foreignKey: 'car_id'
});

Car.hasMany(Reservation, {
  foreignKey: 'car_id'
});
module.exports = { Reservation, Customer, Car };
