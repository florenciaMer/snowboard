function authMiddleware(req, res, next){
    if(req.session.userLogued !== undefined){
        next()
    }else{
        res.send('solo para logueados es esta pagina')
    }
}
module.exports = authMiddleware 