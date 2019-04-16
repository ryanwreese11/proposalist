const bcrypt = require('bcryptjs')

module.exports = {
  // createCustomer: async (req, res) => {
  //   const { firstName, lastName, email, address, usage, notes, progress, apptDate, apptTime }
  //   const db = req.app.get('db')
  //   const newCustArr = await db.create_customer([])
  // },

  getAll: (req, res) => {
    req.app.get('db')
      .get_customers()
      .then((customers) => {
        res.status(200).send(customers)
      })
      .catch(err => {
        res.status(418).send('Seomething went wrong');
        console.log(err)
      })

  }
}