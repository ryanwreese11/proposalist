const bcrypt = require('bcryptjs')
const {REACT_APP_LOGIN} =process.env
require('dotenv').config()

module.exports = {
  register: async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    const db = req.app.get('db')
    const userArr = await db.find_user_by_email([email])
    if (userArr[0]) {
      return res.status(400).send({ message: 'Email already in use.' })
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    let newUserArr = await db.create_user([firstName, lastName, email, hash]);
    req.session.user = { name: newUserArr[0].user_first_name, lastName: newUserArr[0].user_last_name, email: newUserArr[0].user_email, id: newUserArr[0].user_id }
    res.status(200).send({
      message: 'Logged in.',
      userData: req.session.user,
      loggedIn: true
    })
  },

  login: async (req, res) => {
    const { email, password } = req.body
    const db = req.app.get('db')
    const userArr = await db.find_user_by_email([email])
    if (!userArr[0]) {
      return res.status(200).send({ message: 'Email not found' })
    }
    
    const result = bcrypt.compareSync(password, userArr[0].user_hash)
    if (!result) {
      return res.status(200).send({ message: 'Incorrect password' })
    }
    req.session.user = { name: userArr[0].user_first_name, email: userArr[0].user_email, id: userArr[0].user_id, admin: userArr[0].is_admin, rep: userArr[0].is_rep }
    res.status(200).send({
      message: 'Login Successful',
      loggedIn: true,
      
    })
  },

  userData(req, res) {
    if (req.session.user) res.status(200).send(req.session.user)
    else res.status(200).send('Please Log In')
  },


  logout(req, res) {
    req.session.destroy();
    res.redirect(REACT_APP_LOGIN)
  }
}