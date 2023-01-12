

let colorxProducts = require("./colorxProducts")

module.exports = (sequelize, dataTypes) =>{
    let alias = "Product";
    let cols ={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        } ,
        name: {
            type: dataTypes.STRING
        },
        price:{
            type: dataTypes.DECIMAL
        } ,
        description:{
            type: dataTypes.STRING
         } ,
        image:{
            type: dataTypes.STRING
        } ,
        brandId:{
            type: dataTypes.INTEGER
        } ,
        size:{
            type: dataTypes.INTEGER
        } ,
        colorId:{
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tableName: "product", 
        timestamps: false //si no tiene estas columns no falla created_at updated_at 
    }
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
      Product.belongsTo(models.colorxProducts, {
            as: "color",
            foreignKey: "colorId"
        })  
        Product.belongsTo(models.brandxProducts, {
            as: "brand",
            foreignKey: "brandId"
        })     
    }

   
      return Product;
}   