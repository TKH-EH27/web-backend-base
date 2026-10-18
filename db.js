const { DatabaseSync } = require('node:sqlite');

// Connect to database
const db = new DatabaseSync('travel.db');


// Create User Table
const createUserTable = `
    CREATE TABLE IF NOT EXISTS USER (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NAME TEXT NOT NULL,
        EMAIL TEXT UNIQUE NOT NULL,
        ROLE TEXT NOT NULL,
        PASSWORD TEXT NOT NULL
    )
`;

module.exports = {
    db,
    createUserTable
};