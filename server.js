require('dotenv').config()
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    ejwt = require('express-jwt'),
    cors = require('cors'),
    fs = require('fs'),
    router = express.Router(),
    path = require('path'),
    port = process.env.PORT || 3000

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
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
        url: '/users',
        methods: ['POST']
    }, 
    {
        url: '/users/signin',
        methods: ['POST']
    }, 
    {
        url: '/users/forgot_password',
        methods: ['POST']
    }, 
    {
        url: /users\/reset_password\/.*$/,
        methods: ['POST']
    }]
}))

fs.readdirSync('./app/routes').forEach((file) => {
    router.use(`/${path.parse(file).name}`, require(`./app/routes/${file}`)(
        express.Router()
    ))
})

app.use(router)

app.listen(port, () => {
    console.log(`Server active at http://localhost:${port}`)
})