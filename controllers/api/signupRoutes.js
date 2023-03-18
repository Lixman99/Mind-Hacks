const router = require("express").Router();
const { Customer } = require(`../../models`);

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body)
    const customer = await Customer.create(req.body);

    // if (customerData) {
    //   res.status(400).json({ message: "Please use an other name" });
    //   return;
    // }

    req.session.save(() => {
      req.session.user_id = customer.id;
      req.session.logged_in = true;
        // req.session.isAdmin = "someEmail@email.com"===customer.email
      res.json({ customer, message: "Account created" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
