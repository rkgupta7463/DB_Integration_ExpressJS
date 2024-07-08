const express = require('express');
const path = require('path');
const { sequelize, User } = require('./db/database');
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Test database connection and sync models
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
        return sequelize.sync(); // Sync all defined models to the DB
    })
    .then(() => {
        console.log('Database synced successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


app.get('/', (req, res) => {
    // res.send({ 'status': 'success', 'message': 'Welcome to Postgres DB session!' });
    res.render('index.html');
});


// Create a new user
app.post('/create-user', async(req, res) => {
    try {
        console.log(req.body.name, req.body.email);
        const user = await User.create({ name: req.body.name, email: req.body.email });
        res.json({ 'status': 'success', 'message': 'Data have inserted into DB!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user ', error: error.message });
    }
});


// Read all users
app.get('/users', async(req, res) => {
    try {
        const users = await User.findAll();
        console.log(typeof(users));
        if (users.length > 0) {
            res.json(users);
        } else {
            res.json({ 'status': 'field', 'message': 'Data not found!' });

        }
    } catch (error) {
        res.status(500).json({ 'status': 'field', 'message': 'Failed to retrieve users' });
    }
});

// Update a user
app.put('/update/:id', async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        // console.log("user data-", user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { name, email } = req.body;
        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
});

// Delete a user
app.delete('/delete-user/:id', async(req, res) => {
    try {
        const user = await User.findByPk((req.params.id));
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            await user.destroy();
            res.json({ message: 'User deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

//Delete All
app.delete('/delete/all', async(req, res) => {
    try {
        await User.destroy({ where: {}, truncate: true });
        res.json({ message: 'All users have been removed from the database!' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
})


app.listen(port, () => console.log(`server is running on port: http://localhost:${port}`));