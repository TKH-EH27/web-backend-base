const express = require('express');
const { 
    retrieveAllTrips, 
    getTripReviews, 
    allTripsWithRatings 
} = require('../controllers/tripController');
const tripRouter = express.Router();

tripRouter.get('/', retrieveAllTrips);
tripRouter.get('/reviews', getTripReviews);
tripRouter.get('/ratings', allTripsWithRatings);

module.exports = tripRouter;