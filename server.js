const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// environment variables
require('dotenv').config();

const app = express();
const port = 4000 || process.env.PORT;
app.set('port', port);

app.use(cors());
app.use(express.json());

// database connection
const uri = process.env.URI;
mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).catch(err => console.log(err));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongodb connection successful');
});

// register and login and logout system
const user = require('./routes/auth.routes');
app.use('/user', user);

// routes for crud actions
// const addBirthdays = require('./routes/crud_actions');
// app.use('/days', addBirthdays);

// images folder for saving uploaded avatar
// app.use('/images', express.static(path.join(__dirname, 'images')));


const publicPath = path.join(__dirname, 'frontend', 'build');
app.use(express.static(publicPath));

app.get('/user', (req, res) => res.json({name: 'req'}));

app.get('*',(req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
})

app.listen(port, function () {
    console.log(`Server up and running on port ${port}`);
});