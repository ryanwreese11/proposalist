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
      },

      createModule: (req, res) => {
        const{modName, modSize} = req.body
        
        req.app.get('db')
        .create_module([modName, modSize])
      },

      createInverter: (req, res) => {
        const{invName, invType} = req.body
        
        req.app.get('db')
        .create_inverter([invName, invType])
      }


  }
