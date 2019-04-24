module.exports = {
  createProposal: (req, res) => {
    const { custId, utility, moduleName, inverterName, loanName, production, systemCost, systemSize, propSigned } = req.body

    const { id } = req.session.user

    const db = req.app.get('db')
    db.create_proposal([custId, utility, id, moduleName, inverterName, loanName, production, systemCost, propSigned, systemSize ])
  },

  getProposalById: (req, res) => {
    const {id} = req.params
    req.app.get('db')
    .get_proposal_by_id(id)
    .then((proposals) => {
      res.status(200).send(proposals)
    })
    .catch(err => {
      res.status(418).send('Something went wrong');
      console.log(err)
    })
  }

}