const router = require('express').Router();
const  Car  = require('../models/Car');

// GET all cars
router.get('/cars', async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.status(200).json(cars);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one car by id
router.get('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) {
      res.status(404).json({ message: 'Car not found' });
    } else {
      res.status(200).json(car);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST a new car
router.post('/cars', async (req, res) => {
  try {
    const newCar = await Car.create(req.body);
    res.status(201).json(newCar);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT update an existing car
router.put('/cars/:id', async (req, res) => {
  try {
    const updatedCar = await Car.update(req.body, {
      where: { id: req.params.id }
    });
    if (updatedCar[0] === 0) {
      res.status(404).json({ message: 'Car not found' });
    } else {
      res.status(200).json({ message: 'Car updated successfully' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE an existing car
router.delete('/cars/:id', async (req, res) => {
  try {
    const deletedCar = await Car.destroy({
      where: { id: req.params.id }
    });
    if (!deletedCar) {
      res.status(404).json({ message: 'Car not found' });
    } else {
      res.status(200).json({ message: 'Car deleted successfully' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
