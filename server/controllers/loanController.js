module.exports = {
  getLoans: (req, res) => {
    req.app.get('db')
    .get_loans() 
    .then((loans) => {
      return res.status(200).send(loans)
    })
    }
}