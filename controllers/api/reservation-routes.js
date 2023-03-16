const nodemailer = require('nodemailer');
const router = require('express').Router();
const Reservation = require('../../models/reservation');
const reservation = new Reservation();
 






// GET all reservatins
router.get('/reservation', async (req, res) => {
    try {
      const reservation = await Reservation.findAll();
      res.status(200).json(reservation);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


// POST a new reservation
router.post('/reservation', async (req, res) => {
  try {
    const { customerId, carId, pickupDate, returnDate, email } = req.body;

    if (!email) {
      res.status(400).json({ message: 'Customer email is required' });
      return;
    }

    const newReservation = await Reservation.create({
      customerId,
      carId,
      pickup: pickupDate,
      return: returnDate,
    });

    // Send confirmation email
    const messageId = await newReservation.sendConfirmationEmail(email); // Pass the email from the request body

    // Return reservation ID and email message ID in response
    res.status(200).json({ reservationId: newReservation.reservationId, messageId });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




  
  // PUT update an existing reservation
  router.put('/reservation/:id', async (req, res) => {
    try {
      const updatedReservation = await Reservation.update(req.body, {
        where: { id: req.params.id }
      });
      if (updatedReservation[0] === 0) {
        res.status(404).json({ message: 'Reservation not found' });
      } else {
        res.status(200).json({ message: 'Reservation updated successfully' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  // DELETE an existing reservation by reservation_id
router.delete('/reservation/:id', async (req, res) => {
  try {
    const deletedReservation = await Reservation.destroy({
      where: { reservationId: req.params.id }, // Update the field name here
    });
    if (!deletedReservation) {
      res.status(404).json({ message: 'Reservation not found' });
    } else {
      res.status(200).json({ message: 'Reservation deleted successfully' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

  
  module.exports = router;
  

