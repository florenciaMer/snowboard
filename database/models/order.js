

//let colorxProducts = require("./colorxProducts")

const OrderItems = require("./orderItems");

module.exports = (sequelize, dataTypes) =>{
    let alias = "Order";
    let cols ={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        } ,
        userId: {
            type: dataTypes.INTEGER,
        } ,
        total:{
            type: dataTypes.DECIMAL
        } ,
        paymentMethod: {
            type: dataTypes.STRING
        },
        shippingMethod:{
            type: dataTypes.STRING
         } ,
       
       
    }
    let config = {
        tableName: "orders", 
        timestamps: false //si no tiene estas columns no falla created_at updated_at 
    }
    const Order = sequelize.define(alias, cols, config);

    Order.associate = function(models){
    /*Order.belongsTo(models.OrderItems, {
            as: "ordersItems",
            foreignKey: "orderId"
        }) */
        Order.OrderItems = Order.hasMany(models.OrderItems, {
            as: "OrderItems",
          }); 
    }

      return Order;
}   

