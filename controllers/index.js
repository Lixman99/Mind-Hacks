const router = require('express').Router();

const reservationRoutes = require('./reservation-routes');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const userRoutes = require('./api/user-routes');




router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/',reservationRoutes );
router.use('/api', userRoutes);


module.exports = router;
