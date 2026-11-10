const { db } = require('../db');

const retrieveAllTrips = async (req, res) => {
    try {
        query = "SELECT * FROM TRIPS";
        const [trips] = await db.query(query);
    
        return res.status(200).json({
            status: "success",
            results: trips.length,
            data: trips
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Database error',
        });
    }
};

const getTripReviews = async (req, res) => {
  try {
    const query = `SELECT 
      t.DESTINATION, r.RATING, u.USERNAME
      FROM TRIPS AS t
      INNER JOIN REVIEWS AS r ON t.ID = r.TRIP_ID
      INNER JOIN USERS AS u ON r.USER_ID = u.ID`;
    const [rows] = await db.query(query);

    return res.status(200).json({ 
      data: rows 
    });

  } catch (error) { 
    console.error(error); 
    return res.status(500).json({ 
      message: 'Database error' 
    }); 
  }
};

const allTripsWithRatings = async (req, res) => {
  try {
    const query = `SELECT t.DESTINATION, r.RATING FROM TRIPS AS t
      LEFT JOIN REVIEWS AS r ON t.ID = r.TRIP_ID`;
    const [results] = await db.query(query);
    return res.status(200).json({ data: results });
  } catch (error) { 
    console.error(error); 
    return res.status(500).json({ 
      message: 'Database error' 
    }); 
  }
};

module.exports = { 
  retrieveAllTrips, 
  getTripReviews, 
  allTripsWithRatings 
};