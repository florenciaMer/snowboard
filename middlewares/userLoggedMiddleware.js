function userLoggedMiddleware(req, res, next){


  res.locals.isLogged = false;
  if(req.session.userLogged != undefined){
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged;
      console.log('holaaa!!!!!! estoy en userLoggedMD')
  }
  console.log('antes del next()')
  next ();
}
module.exports = userLoggedMiddleware;
