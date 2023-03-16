const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const nodemailer = require('nodemailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;
const { EMAIL, PASSWORD } = require('../env');

const emailTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      .container {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        background-color: #f5f5f5;
        padding: 30px;
      }
      .header {
        font-size: 24px;
        color: #333;
      }
      .content {
        font-size: 16px;
        color: #333;
      }
      .list {
        font-size: 14px;
        list-style-type: none;
      }
      .list-item {
        margin-bottom: 8px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1 class="header">Reservation Confirmation</h1>
      <p class="content">
        Thank you for reserving a car with us. Your reservation details are as
        follows:
      </p>
      <ul class="list">
        <li class="list-item">Car ID: ${this.carId}</li>
        <li class="list-item">Pickup Date: ${this.pickup}</li>
        <li class="list-item">Return Date: ${this.return}</li>
        <li class="list-item">Price: ${this.price}</li>
      </ul>
      <p class="content">
        Thank you for choosing our car rental service!
      </p>
    </div>
  </body>
</html>
`;

class Reservation extends Model {
  async sendConfirmationEmail(customerEmail) {
    // Define email transport settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    // Add the htmlToText plugin to automatically create plain text version
    transporter.use("compile", htmlToText());

    // Define email message settings
    const message = {
      from: "vintagecruisers99@gmail.com",
      to: customerEmail,
      subject: "Reservation Confirmation",
      html: emailTemplate,
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
      autoIncrement: true,
    },
    carId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cars',
        key: 'carId',
      },
    },
    customerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'customers',
        key: 'customerId',
      },
    },
    pickup: {
      type: DataTypes.DATE,
    },
    return: {
      type: DataTypes.DATE,
    },
    price: {
      type: DataTypes.DECIMAL,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'reservation',
  }
);

module.exports = Reservation;
