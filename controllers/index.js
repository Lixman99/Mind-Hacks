const router = require(`express`).Router();

const homeRoutes = require(`./homeRoutes`);
const rentRoutes = require(`./rentRoutes`);
const galleryRoutes = require(`./galleryRoutes`);

router.use(`/`, homeRoutes);
router.use(`/rentRoutes`,rentRoutes);
router.use(`/galleryRoutes`,galleryRoutes);

