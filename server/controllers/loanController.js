module.exports = {
  getLoans: (req, res) => {
    req.app.get('db')
    .get_loans() 
    .then((loans) => {
      return res.status(200).send(loans)
    })
    },

    createLoan: async (req, res) => {
      const {loanName, loanTerm, interest, prePmtFactor, postPmtFactor } = req.body
      await req.app.get('db')
      .create_loan([loanName, loanTerm, interest, prePmtFactor, postPmtFactor])
  
    }



}