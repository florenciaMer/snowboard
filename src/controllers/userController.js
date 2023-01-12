const { validationResult } = require('express-validator');
const { json } = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { title } = require('process');
const { memoryStorage } = require('multer');
let bcryptjs = require('bcryptjs');
const { Console } = require('console');


let modelPath = path.join(__dirname, '../../database/models');
let db= require(modelPath)
const Users = db.User;



let userController = {
    registerForm: function(req,res){  
            res.render('register', {title:'Register'});
    },
    create: function(req, res){
        let errors = validationResult(req)
        //res.send(validationResult(req).mapped()) //veo los datos cómo un array literal
       
          if(errors.isEmpty()){
            //let validacion = bcryptjs.compareSync(req.body.password, req.body.confirmPassword)
            
            if(req.body.password !== req.body.confirmPassword){
            //if(!validacion){
                res.render('register',{
                    errors:['the credentials do not match'],               
                    oldData: req.body,
                    title:'Register'
                  });
            }else{

              /****** creating user */
              Users.findOne({ 
                where:{
                email: req.body.email
              },
          })
        .then((response) => {
            if(response == null){
       
              Users.create({
                  name:req.body.name,
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  email:req.body.email,
                  password: bcryptjs.hashSync(req.body.password, 10)  
              })
            .then(() => {
              res.redirect("/users/loginForm");
            })
            .catch((error) => {
              console.error(error);
              res.send(error);
            })
          }else{
           // console.log('ya existe el email')
            res.render('register',{
              email:['That email already exists, please select another one'],               
              oldData: req.body,
              title:'Register'
            });
          }
        });
        
              /****** end creating user */
        }
            
        }else{
        
          //envio los errores a la vista en un array de errores
          res.render('register',{
              errors: errors.mapped(),               
              oldData: req.body,
              title:'Register'
            });

      }
  },
  loginForm:function(req, res){
    let password2= false;
    res.render('loginForm',{title: "Login", password2});
  },

  login:function(req, res){
    console.log('estoy en login e imprimo session')
    console.log(req.session);
    let errors = validationResult(req);
    let usuarioLogueado=[];
        if(!errors.isEmpty()){
            return res.render('loginForm', {
              title:'login',
                errors: errors.mapped(),
                oldData: req.body,
            });
        }else {
        Users.findOne({ where:{
            email: req.body.email
            }
        })
        //existe el email
        .then((response) => {
            if(response != null){
                let verificarpass = bcryptjs.compareSync(req.body.password, response.password)
                    if(verificarpass){
                        userLogged = response
                        req.session.userLogged = response
                      
                        if(req.body.rememberCheck != undefined){
                            res.cookie('remember', userLogged.email, {
                              maxAge: 60000 
                            })
                        }

                       
                        return res.render('cart',{title: 'Cart detail'})
                        // res.send(req.session.userLogged)
                    }else{
                      return res.render('loginForm', {
                        title:'login',
                          password2:['The credentials do not match, please retry'],               
                          oldData: req.body,
                      });

                    }
            }
          
          })
          .catch((error) => {
            console.error(error);
            res.send(error);
          })
     
    }
  },

  logout: function (req, res) {
    req.session.destroy();
    res.clearCookie("remember");
    return res.redirect("/");
  },

  next:function(req, res){
    res.render('cart',{title: "Cart detail"});
  },
}
module.exports = userController;
