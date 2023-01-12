const path = require('path');
let modelPath = path.join(__dirname, '../../database/models');
let db= require(modelPath)


let indexController = {
    list: function(req, res){
        db.Product.findAll({
            include:[{
              //es el nombre que defino en el modelo de la asociacion
              association:"color"},{association:"brand"}] 
          })               
            .then(function(response){
              return res.render('index',{products: response, title:'Snowboard'});
            })
         },
};

module.exports = indexController;

