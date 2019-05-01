module.exports = {
  createProposal: (req, res) => {
    const { custId, utility, moduleName, inverterName, loanName, production, systemCost, systemSize, propSigned, moduleAmount, propRatio } = req.body

    const { id } = req.session.user

    const db = req.app.get('db')
    db.create_proposal([custId, utility, id, moduleName, inverterName, loanName, production, systemCost, propSigned, systemSize, moduleAmount, propRatio ])
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
  },

  getProposalByPropId: (req, res) => {
    const {prop_id} = req.params
    req.app.get('db')
    .get_proposal_by_prop_id(prop_id)
    .then((proposal) => {
      res.status(200).send(proposal)
    })
    .catch(err => {
      res.status(418).send('Something went wrong');
      console.log(err)
    })
  },

  deleteProposal: (req, res) => {
    const {id} = req.params
    req.app.get('db')
    .delete_proposal(id)
    .then(()=> {
      res.status(200).send('Proposal deleted.')
    })
    .catch(err => {
      res.status(500).send("Oops! Something went wrong. Our engineers have been informed!");
      console.log(err)
    });
  }

}