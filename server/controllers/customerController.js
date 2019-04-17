

module.exports = {
  newCust: async (req, res) => {
    const { firstName, lastName, email, address, utility, notes, apptDate, apptTime, custProgress } =req.body
    console.log(req.body)
    const {id} = req.session
    console.log(req.session.user)
    const db = req.app.get('db')
    const custArr = await db.find_cust_by_email([email])
    if (custArr[0]) {
      return res.status(400).send({message: 'Email already in use'})
    }
    await db.create_customer([firstName, lastName, email, address, utility, notes, apptDate, apptTime, id, custProgress])
  },

  getAll: (req, res) => {
    req.app.get('db')
      .get_customers()
      .then((customers) => {
        res.status(200).send(customers)
      })
      .catch(err => {
        res.status(418).send('Something went wrong');
        console.log(err)
      })

  }
}