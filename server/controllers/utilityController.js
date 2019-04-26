module.exports = {
  getUtilities: (req, res) => {
    req.app.get('db')
      .get_utilities()
      .then((utilities) => {
        return res.status(200).send(utilities)
      }).catch(err => {
        res.status(418).send('Cannot get utilities')
      })
  },

  createUtility: (req, res) => {
    const {utilityName, utilityRate, utilityLocation, utilityPpw } = req.body
    req.app.get('db')
    .create_utility([utilityName, utilityRate, utilityLocation, utilityPpw])
  }

}