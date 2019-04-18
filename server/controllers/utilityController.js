module.exports = {
  getUtilities: (req, res) => {
    req.app.get('db')
      .get_utilities()
      .then((utilities) => {
        console.log(utilities)
        return res.status(200).send(utilities)
      }).catch(err => {
        res.status(418).send('Cannot get utilities')
      })
  }
}