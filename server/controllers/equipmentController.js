module.exports ={
  getModules: (req, res) => {
    req.app.get('db')
    .get_modules() 
    .then((modules) => {
      return res.status(200).send(modules)
    })
    },

    getInverters: (req, res) => {
      req.app.get('db')
      .get_inverters() 
      .then((inverters) => {
        return res.status(200).send(inverters)
      })
      }


  }
