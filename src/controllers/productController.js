const { validationResult } = require('express-validator');
const { json } = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
let modelPath = path.join(__dirname, '../../database/models');
let db= require(modelPath)


//llamo al alias del modelo

//let db= require(modelPath)



let productController = {
  
    detail: function(req,res){ 
      const idUrl = req.params.id;
      db.Product.findByPk(idUrl,{
      include:[{
        //es el nombre que defino en el modelo de la asociacion
        association:"color"},{association:"brand"}] 
    })     
      .then(function(product){
        res.render('detail_prod',{product: product, title: 'Detail product'}); 

      })
      //res.render('detail_prod',  { title: 'Detail product' }/*{product: product}*/);

     /* const idUrl = req.params.id;
      db.Products.findByPk(idUrl)
      .then(function(product){
        res.render('det_prod',{product: product}); 

      })
      */
     /* for(let product of products){
          if(parseInt(product.id) == parseInt(idUrl)){ 
            res.render('det_prod',{product: product}); 
         }
     }*/
    },
     

};

module.exports = productController;

