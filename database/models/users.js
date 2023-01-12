


module.exports = (sequelize, dataTypes) =>{
    let alias = "User";
    let cols ={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        } ,
        firstName: {
            type: dataTypes.STRING
        },
       
        lastName:{
            type: dataTypes.STRING
         } ,
        email:{
            type: dataTypes.STRING
        } ,
       
        password:{
            type: dataTypes.STRING
        } ,
       
    }
    let config = {
        tableName: "user", 
        timestamps: false //si no tiene estas columns no falla created_at updated_at 
    }
    const User = sequelize.define(alias, cols, config);

    User.associate = function(models){
     
     /*   Product.belongsToMany(models.Provider, {
            as: "provider",
            //nombre de la tabla intermedia 'mediante traduccion'
            through: 'providerxproduct',
            foreignKey: "idProduct",
            otherKey: "idProvider",
            timestamps:false,
        })   */  
    }
    return User;
}   