const { app } = require('./index');
const PORT = 3000;
const HOSTNAME = '127.0.0.1';

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on port ${PORT}`);
});