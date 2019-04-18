require('dotenv').config()

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const ac = require('./controllers/authController')
const cc = require('./controllers/customerController')
const uc = require('./controllers/userController')
const utc = require('./controllers/utilityController')
const ec = require('./controllers/equipmentController')

const express = require('express')
const session = require('express-session')
const massive = require('massive')

const app = express()

app.use(express.json())

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))


massive(CONNECTION_STRING)
  .then(db => {
    app.set('db', db)
    console.log('db running')
    app.listen(SERVER_PORT, () => console.log(`Listening on port:${SERVER_PORT}`))
  })

  // --- ENDPOINTS --- //


  // ---- AUTH CONTROLLERS ---- //
  app.post('/auth/register', ac.register)
  app.get('/auth/user-data', ac.userData)
  app.post('/auth/login', ac.login)
  app.get('/logout', ac.logout)
  
  
  // ---- CUSTOMER CONTROLLERS ---- //
  app.get('/api/customers', cc.getAll)
  app.post('/api/customers',cc.newCust)


  // ---- USER CONTROLLERS ---- //

  app.get('/api/users', uc.getUsers)
  app.post('/api/users', uc.createUser)


  // ---- UTILITY CONTROLLERS ---- //
  
  app.get('/api/utilities', utc.getUtilities)


  // ---- EQUIPMENT CONTROLLERS ---- //

  app.get('/api/modules', ec.getModules)
  app.get('/api/inverters', ec.getInverters)
