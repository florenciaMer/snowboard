const { validationResult } = require('express-validator');
const { json } = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const order = require('../../database/models/order');
let modelPath = path.join(__dirname, '../../database/models');
let db= require(modelPath)

let apiController = {
  
  checkout: async function(req, res) {
 
    let order = await db.Order.create(
      { ...req.body, userId: req.session.userLogged.id},
        {
          include: db.Order.OrderItems,
        }
      );
        res.json({ ok: true, status:200, order: order})
    },
    detail: function(req,res){ 
      const idUrl = req.params.id;
      db.Product.findByPk(idUrl,{
    })     
      .then(function(product){
        res.json(product); 
      })
    },
      }

module.exports = apiController;