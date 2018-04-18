require('dotenv').config()
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    ejwt = require('express-jwt'),
    cors = require('cors'),
    port = process.env.PORT || 3000

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true,
    type: 'application/x-www-form-urlencoded'
}))

app.use(bodyParser.json({
    limit: '500mb',
    type: 'application/*'
}))

app.use(ejwt({
    secret: process.env.TOKEN_SECRET || 'devSecret'
}).unless({
    path: [{
        url: '/auth/signup',
        methods: ['POST']
    }, 
    {
        url: '/auth/login',
        methods: ['POST']
    }, 
    {
        url: '/auth/forgot_password',
        methods: ['POST']
    }, 
    {
        url: /auth\/reset_password\/.*$/,
        methods: ['POST']
    }]
}))

app.listen(port, () => {
    console.log(`Server active at http://localhost:${port}`)
})