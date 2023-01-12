const path = require('path');
let modelPath = path.join(__dirname, '../../database/models');

let db= require(modelPath)

let cartController = {
    detail: function(req, res){
           return res.render('cart',{title:'Cart'});
      },
    order: async function (req, res) {
        console.log('order itemsss')

    let order =  await db.Order.findByPk(req.params.id, {
         include: db.Order.OrderItems,
    });
    console.log(order.OrderItems)
  
   
    return res.render('order',{order: order, title:'Order detail'});
    },
};

module.exports = cartController;

