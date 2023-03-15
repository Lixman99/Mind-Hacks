const router = require('express').Router();
const Customer = require('../../models/Customer');
const customer = new Customer();


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



// POST a new customers
router.post('/customer', async (req, res) => {
    try {
      const newCustomer = await Customer.create(req.body);
      res.status(201).json(newCustomer);
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
  
  // DELETE an existing customer
  router.delete('/customer/:id', async (req, res) => {
    try {
      const deletedCustomer = await Customer.destroy({
        where: { id: req.params.id }
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
  
