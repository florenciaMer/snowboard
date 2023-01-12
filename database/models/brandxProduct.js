const { Model } = require("sequelize");

module.exports = (sequelize, dataTypes) =>{

    let alias = "brandxProducts";
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
        tableName: "brand", 
        timestamps: false //si no tiene estas columns no falla created_at updated_at 
    }
    const brandxproducts = sequelize.define(alias, cols, config);
    
   brandxproducts.associate = function(models){
   
        brandxproducts.hasMany(models.Product, {
            as: "product",
            foreignKey: "brandId"
        }) 
    }
    return brandxproducts;
}   