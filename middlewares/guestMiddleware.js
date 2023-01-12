function guestMiddleware(req, res, next){
    if(req.session.userLogued == undefined){
        next()
    }else{
        res.send('solo para invitados es esta pagina')
    }
}
module.exports = guestMiddleware 