const router = require('express').Router();
const Customer = require('../../models/Customer');
const customer = new Customer();
const Reservation = require('../../models/Reservation');




// GET all customers
router.get('/customer', async (req, res) => {
    try {
      const customers = await Customer.findAll();
      res.status(200).json(customers);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // Create a new GET route for fetching a customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findOne({ where: { customer_id: req.params.id } });

    if (!customer) {
      res.status(404).json({ message: 'No customer found with this ID.' });
      return;
    }

    res.json(customer);
  } catch (err) {
    res.status(500).json(err);
  }
});



// POST a new customers
router.post('/customer', async (req, res) => {
    try {
      const newCustomer = await Customer.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
  
      req.session.save(() => {
        req.session.loggedIn = true;
        res.status(200).json();
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  // PUT update an existing customer id
  router.put('/customer/:id', async (req, res) => {
    try {
      const updatedCustomer = await Customer.update(req.body, {
        where: { id: req.params.id }
      });
      if (updatedCustomer[0] === 0) {
        res.status(404).json({ message: 'Customer not found' });
      } else {
        res.status(200).json({ message: 'Customer updated successfully' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  // DELETE an existing customer by customer_id
router.delete('/customer/:id', async (req, res) => {
  try {
    // Check if there are any associated reservations
    const reservations = await Reservation.findAll({
      where: { customerId: req.params.id },
    });

    // If there are reservations, return an error message
    if (reservations.length > 0) {
      res.status(400).json({
        message: 'Cannot delete customer with associated reservations.',
      });
      return;
    }

    // If no reservations, proceed with deletion
    const deletedCustomer = await Customer.destroy({
      where: { customerId: req.params.id },
    });
    if (!deletedCustomer) {
      res.status(404).json({ message: 'Customer not found' });
    } else {
      res.status(200).json({ message: 'Customer deleted successfully' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

  
  module.exports = router;
  
