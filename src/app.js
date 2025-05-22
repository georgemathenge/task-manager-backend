// app.js
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./modules/tasks/tasks.routes');
const userRoutes = require('./modules/users/users.routes');



const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({
    
    origin: '*', // Allow all origins (consider specifying your frontend origin for production)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-shop-id']
}));

app.options('*', cors());


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', taskRoutes);

module.exports = app;

