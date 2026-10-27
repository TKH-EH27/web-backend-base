const { app } = require('./index.js');
const { db, createUserTable } = require('./db.js');

const PORT = 3000;
const HOSTNAME = '127.0.0.1';

async function startServer() {
  try {
    await db.query(createUserTable);
    console.log('Users table created or already exists.'); 

    app.listen(PORT, HOSTNAME, () => {
      console.log(`Server is running at http://${HOSTNAME}:${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing the database:', error);
    process.exitCode = 1;
    await db.end(); 
  }
}

startServer();