const bcrypt = require('bcryptjs')
module.exports = {
  getUsers: (req, res) => {
    req.app.get('db')
      .get_users()
      .then((users) => {
        res.status(200).send(users)
      })
      .catch(err => {
        res.status(418).send('Cannot get users')
      })
  },

  createUser: async (req, res) => {
    const { firstName, lastName, email, password, isAdmin, isRep, dark} = req.body
    const db = req.app.get('db')
    const userArr = await db.find_user_by_email([email])
    if (userArr[0]) {
      return res.status(400).send({ message: 'Email already in use.' })
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    await db.create_user([firstName, lastName, email, hash, isAdmin, isRep, dark]);

  },

  updateUser: async (req, res) => {
    const {id} = req.params
    const {firstName, lastName, email, dark} = req.body
    const db = req.app.get('db')
    console.log(req.body)
    
    let updatedUserArr = await db.update_user([id, firstName, lastName, email, dark])
    req.session.user = { firstName: updatedUserArr[0].user_first_name, lastName: updatedUserArr[0].user_last_name, email: updatedUserArr[0].user_email, id: updatedUserArr[0].user_id, admin: updatedUserArr[0].is_admin, rep: updatedUserArr[0].is_rep, dark: updatedUserArr[0].dark}
    return res.status(200).send({
      message: 'Logged in.',
      userData: req.session.user,
      loggedIn: true
    })
  }

  

}