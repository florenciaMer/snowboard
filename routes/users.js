var express = require('express');
const userController = require('../src/controllers/userController');
var router = express.Router();

let guestMiddleware = require('../middlewares/guestMiddleware')
//la ruta de register es solo para invitado
let authMiddleware = require('../middlewares/authMiddleware')

let { body, checkBody} = require('express-validator');

let validationRegister =[
    body('firstName').notEmpty().withMessage('you must fill in the first name'),
    body('lastName').notEmpty().withMessage('you must fill in the last name'),
    body('email')
    .notEmpty().withMessage('you must complete a valid email').bail() //bail detiene la validacion si dio error,
    .isEmail().withMessage('invalid email format'),
    body('password').notEmpty().withMessage('you must fill in the password'),
    body('confirmPassword').notEmpty().withMessage('you must fill in the confirm password'),

]

let validationLogin =[
    body('email')
    .notEmpty().withMessage('you must complete a valid email').bail() //bail detiene la validacion si dio error,
    .isEmail().withMessage('invalid email format'),
    body('password').notEmpty().withMessage('you must fill in the password'),
]


/* GET home page. */
router.get('/register', guestMiddleware, userController.registerForm);
router.post('/login',validationLogin, userController.login);
router.post('/createAcount',validationRegister, userController.create);
router.get('/loginForm', userController.loginForm);
router.get('/next', userController.next);
router.get('/logout', userController.logout);
module.exports = router;