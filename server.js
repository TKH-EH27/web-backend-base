const { app } = require('./index');
const { db, createUserTable } = require('./db');
const PORT = 3000;
const HOSTNAME = '127.0.0.1';

db.exec(createUserTable);

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on port ${PORT}`);
});