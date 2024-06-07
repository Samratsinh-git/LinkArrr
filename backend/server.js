const express = require('express');
const cors = require('cors');
// const cookieParser = require('cookie-parser');

const mongoose = require('mongoose')

require('dotenv').config();

const app = express();

// app.use(cookieParser());
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
})

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const socialsRouter = require('./routes/socials');
app.use('/socials', socialsRouter);

app.listen(5000, () => {
    console.log("Server Running on port: 5000");
})

process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err);
    process.exit(1); // Mandatory (as per the Node.js docs)
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Recommended: send the information to sentry.io or similar
});
