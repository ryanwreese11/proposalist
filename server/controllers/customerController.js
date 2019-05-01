

module.exports = {
  newCust: async (req, res) => {
    const { firstName, lastName, email, address, utility, notes, apptDate, apptTime, custProgress } = req.body

    const { id } = req.session.user

    const db = req.app.get('db')
    const custArr = await db.find_cust_by_email([email])
    if (custArr[0]) {
      return res.status(400).send({ message: 'Email already in use' })
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

  },

  getCustomersById: (req, res) => {
    const { id } = req.params
    req.app.get('db')
      .get_customers_by_user_id(id)
      .then((customers) => {

        res.status(200).send(customers)
      })
      .catch(err => {
        res.status(418).send('Something went wrong');
        console.log(err)
      })

  },

  getCustomer: (req, res) => {
    const { cust_id } = req.params

    req.app.get('db')
      .get_customer_by_id([cust_id])
      .then((customer) => {
        res.status(200).send(customer)
      }).catch(err => {
        res.status(404).send('Something went wrong');
        console.log(err)
      })
  },

  updateCustomer: (req, res) => {
    const { cust_id } = req.params
    const { custProgress, usage } = req.body
    // console.log(req.body)
    console.log(req.params)
    req.app.get('db')
      .update_customer([cust_id, usage, custProgress])
      .then((customer) => {
        res.status(200).send(customer)
      })
      .catch(err => {
        res.status(404).send('Something went wrong');
        console.log(err)
      })
  },

  deleteCustomer: (req, res) => {
    const {id} = req.params
    console.log(req.params)
    req.app.get('db')
    .delete_customer(id)
    .then(()=> {
      res.status(200).send('Customer deleted.')
    })
    .catch(err => {
      res.status(500).send("Oops! Something went wrong. Our engineers have been informed!");
      console.log(err)
    });
  }

}



