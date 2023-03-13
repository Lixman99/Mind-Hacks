const router = require('express').Router();
const Reservation = require('../models/reservation');
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
      const newReservation = await Reservation.create(req.body);
      res.status(201).json(newReservation);
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
  
  // DELETE an existing reservation
  router.delete('/reservation/:id', async (req, res) => {
    try {
      const deletedReservation = await Reservation.destroy({
        where: { id: req.params.id }
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
  

