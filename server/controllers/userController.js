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
    const { firstName, lastName, email, password } = req.body
    const db = req.app.get('db')
    const userArr = await db.find_user_by_email([email])
    if (userArr[0]) {
      return res.status(400).send({ message: 'Email already in use.' })
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    await db.create_user([firstName, lastName, email, hash]);

  },

}