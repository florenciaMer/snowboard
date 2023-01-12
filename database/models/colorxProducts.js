const { Model } = require("sequelize");

module.exports = (sequelize, dataTypes) =>{

    let alias = "colorxProducts";
    let cols ={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        } ,
        name: {
            type: dataTypes.INTEGER
        },
    }
    let config = {
        tableName: "color", 
        timestamps: false //si no tiene estas columns no falla created_at updated_at 
    }
   const colorxProducts = sequelize.define(alias, cols, config);
   colorxProducts.associate = function(models){
   
        colorxProducts.hasMany(models.Product, {
            as: "product",
            foreignKey: "colorId"
        }) 
    }
    return colorxProducts;
}   