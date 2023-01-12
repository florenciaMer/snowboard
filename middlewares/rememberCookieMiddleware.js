function rememberCookieMiddleware(req, res, next){
  const path = require('path');
  let modelPath = path.join(__dirname, '../database/models');
  let db = require(modelPath)
  const Users = db.User;

   if(req.cookies.remember !== undefined && req.session.userLogued == undefined){
       
      Users.findOne({ 
            where:{
            email: req.cookies.remember
          },
      })
    .then((response) => {
      console.log('********************estoy en remember cookie')
       // res.session.userLogged = response
        res.locals.isLogged = true;
    })
  }
 
  next();
}    

module.exports = rememberCookieMiddleware 