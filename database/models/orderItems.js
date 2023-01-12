

module.exports = (sequelize, dataTypes) =>{
    let alias = "OrderItems";
    let cols ={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        } ,
        orderId: {
            type: dataTypes.INTEGER,
        } ,
        productId: {
            type: dataTypes.INTEGER,
        } ,
       
        name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.DECIMAL,
        } ,
        quantity:{
            type: dataTypes.INTEGER
         } ,
       
    }
    let config = {
        tableName: "orderitems", 
        timestamps: false //si no tiene estas columns no falla created_at updated_at 
    }
    const OrderItems = sequelize.define(alias, cols, config);

    OrderItems.associate = (models) => {
        OrderItems.belongsTo(models.Order, {
          as: "order",
        });
    
      /*  OrderItems.belongsTo(models.Product, {
          as: "product",
        });*/
      };

      return OrderItems;
}   