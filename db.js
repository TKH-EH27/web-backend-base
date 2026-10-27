const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "travel"
}); // configs

// Create User Table
const createUserTable = `
    CREATE TABLE IF NOT EXISTS USERS (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        USERNAME VARCHAR(255) NOT NULL,
        EMAIL VARCHAR(255) UNIQUE NOT NULL,
        PASSWORD VARCHAR(255) NOT NULL,
        ROLE ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    );
`;

module.exports = {
    db,
    createUserTable
}