const router = require(`express`).Router();
const  Customer  = require (`../models/Customer`);
const withAuth = require(`../utilis/auth`)

router.get(`/`, withAuth, async (req,res)=> {
    try {
        const customerData = await Customer.findAll({
            attributes: { exclude: [`passsword`] },
        });
        // serialzng data 
        const customer = customerData.map((project) => project.get({plain: true}));

res.render(`rent`, {
    customer,
    logged_in: req.session.logged_in
});
    }catch (err) {
        res.status(404).json(err);
    }
});

router.get(`/login` , (req, res) =>{
    if (req.session.logged_in) {
        res.redirect(`/`);
        return;
    }
    res.render(`login`);
});

module.exports = routers;
