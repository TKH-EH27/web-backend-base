const { app } = require('./index.js');
const { db, createUserTable } = require('./db.js');
const dotenv = require('dotenv');
dotenv.config();

async function startServer() {
  try {
    await db.query(createUserTable);
    console.log('Users table created or already exists.'); 

    app.listen(process.env.PORT, process.env.HOSTNAME, () => {
      console.log(`Server is running at http://${process.env.HOSTNAME}:${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Error initializing the database:', error);
    process.exitCode = 1;
    await db.end(); 
  }
}

startServer();