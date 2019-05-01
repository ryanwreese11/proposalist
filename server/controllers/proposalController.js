require('dotenv').config()

const {TWILIO_SID,API_KEY, TWILIO_NUMBER} = process.env

const client = require('twilio')(TWILIO_SID, API_KEY)
module.exports = {
  createProposal: async(req, res) => {
    const { custId, utility, moduleName, inverterName, loanName, production, systemCost, systemSize, propSigned, moduleAmount, propRatio } = req.body
    const { id, firstName, lastName } = req.session.user
    const db = req.app.get('db')
    let createProposal = await db.create_proposal([custId, utility, id, moduleName, inverterName, loanName, production, systemCost, propSigned, systemSize, moduleAmount, propRatio ])
    res.status(200).send(createProposal)
    client.messages.create({
      to: '+18013802038',
      from: TWILIO_NUMBER,
      body:  `${firstName} ${lastName}, you have a new proposal in your portal!`
    })



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