const express = require('express');
const { 
    retrieveAllTrips, 
    retrieveTripById,
    getLastViewedTrip,
    getTripReviews, 
    allTripsWithRatings 
} = require('../controllers/tripController');

const tripRouter = express.Router();

tripRouter.get('/', retrieveAllTrips);
tripRouter.get('/:id', retrieveTripById);
tripRouter.get('/last-viewed', getLastViewedTrip);
tripRouter.get('/reviews', getTripReviews);
tripRouter.get('/ratings', allTripsWithRatings);

module.exports = tripRouter;