const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require('../env');

class Reservation extends Model {
  async sendConfirmationEmail(customerEmail) {
    // Define email transport settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
      port: 465, // Port for SMTP (usually 465)
      secure: true, // Usually true if connecting to port 465
      auth: {
        user: EMAIL, // Your email address
        pass: PASSWORD, // Password (for gmail, your app password)
        // ⚠️ For better security, use environment variables set on the server for these values when deploying
      },
    });

    // Define email message settings
    const message = {
      from: "vintagecruisers99@gmail.com",
      to: customerEmail, // replace with the customer's email address
      subject: "Reservation Confirmation",
      html: `
        <h1>Reservation Confirmation</h1>
        <p>Thank you for reserving a car with us. Your reservation details are as follows:</p>
        <ul>
          <li>Car ID: ${this.carId}</li>
          <li>Pickup Date: ${this.pickup}</li>
          <li>Return Date: ${this.return}</li>
          <li>Price: ${this.price}</li>
        </ul>
        <p>Thank you for choosing our car rental service!</p>
      `,
    };

    // Send the email and return the message ID
    const info = await transporter.sendMail(message);
    return info.messageId;
  }
}

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

