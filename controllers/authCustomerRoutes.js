const router = require(`express`).Router();
const { User } = require(`../models/Customer`);
const withAuth = require(`../utilis/auth`);

// Prevent accessing the renting page to none logged in user 
router.get('/reservation',withAuth,async(req,res) =>{
    try{
        const customerData =await User.findAll({
            attributes: {exclude:['password']},
        });
        const users = customerData.map((project) => project.get({ plain: true}) );

        res.render('reservation', {
            users,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req,res)=> {
    if (req.session.logged_in){
        res.redirect('/reservation');
        return;
    }
    res.render('login')
})

module.exports= router;