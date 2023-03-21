const Car = require('./Car');
const Reservation = require('./Reservation');
const Customer = require("./Customer")
Car.belongsToMany(Customer,{
  through: Reservation,
  as: "car_reservation",
  foreignKey: "carId"
})
Customer.belongsToMany(Car,{
  through: Reservation,
  as: "customer_reservation",
  foreignKey: "customerId"
})

module.exports = { Car, Reservation, Customer };

