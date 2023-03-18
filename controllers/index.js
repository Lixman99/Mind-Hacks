const router = require('express').Router();

const reservationRoutes = require('./api/reservation-routes');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const userRoutes = require('./api/user-routes');
const customerRoutes = require('./api/customer-routes');
const signupRoutes = require('./api/signupRoutes');




router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/',reservationRoutes );
router.use('/api', userRoutes);
router.use('/',customerRoutes);
router.use('/', signupRoutes);


module.exports = router;
