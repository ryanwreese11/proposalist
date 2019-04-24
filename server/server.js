require('dotenv').config()

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const ac = require('./controllers/authController')
const cc = require('./controllers/customerController')
const uc = require('./controllers/userController')
const utc = require('./controllers/utilityController')
const ec = require('./controllers/equipmentController')
const lc = require('./controllers/loanController')
const pc = require('./controllers/proposalController')

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
app.get('/api/customers/:id', cc.getCustomersById)
app.post('/api/customers', cc.newCust)
app.get('/api/usage/:cust_id', cc.getCustomer)
app.put('/api/usage/:cust_id', cc.updateCustomer)


// ---- USER CONTROLLERS ---- //

app.get('/api/users', uc.getUsers)
app.post('/api/users', uc.createUser)



// ---- UTILITY CONTROLLERS ---- //

app.get('/api/utilities', utc.getUtilities)
app.post('/api/utilities', utc.createUtility)


// ---- EQUIPMENT CONTROLLERS ---- //

app.get('/api/modules', ec.getModules)
app.get('/api/inverters', ec.getInverters)
app.post('/api/modules', ec.createModule)
app.post('/api/inverters', ec.createInverter)



// ---- LOAN CONTROLLERS ---- //

app.get('/api/loans', lc.getLoans)
app.post('/api/loans', lc.createLoan)


// ---- PROPOSALS CONTROLLERS ---- //

app.post('/api/proposals', pc.createProposal)
app.get('/api/proposals/:id', pc.getProposalById)
