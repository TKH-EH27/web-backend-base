const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;
const HOSTNAME = '127.0.0.1';

const users = [
    { id: 1, username: 'john_doe', password: 'password123', role: 'user' },
    { id: 2, username: 'jane_smith', password: 'securepass', role: 'user' },
    { id: 3, username: 'admin_user', password: 'adminpass', role: 'admin' } 
];

app.get('/users', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Users retrieved successfully',
        results: users.length,
        data: users
    });
});

app.post('/users', (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide all required fields.'
        });
    }

    const newUser = {
        id: users.length + 1,
        username,
        password,
        role
    };

    users.push(newUser);

    res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: newUser
    });
});


app.get('/users/:id',(req, res) => {
    const id = Number(req.params.id);

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            return res.status(200).json({
                status: 'success',
                data: users[i]
            });
        }
    }

    return res.status(404).json({
        status: 'fail',
        message: 'User not found'
    });
});

app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            users.splice(i, 1); 

            return res.status(200).json({
                status: 'success',
                message: 'User deleted successfully'
            });
        }   

        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }       
});

app.put('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const { username, password, role } = req.body;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {

            if (!username || !password || !role) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Please provide all required fields.'
                });
            }

            users[i].username = username;
            users[i].password = password;
            users[i].role = role;

            return res.status(200).json({
                status: 'success',
                message: 'User updated successfully',
                data: users[i]
            });
        }
    }

    return res.status(404).json({
        status: 'fail',
        message: 'User not found'
    });
});


app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on port ${PORT}`);
});