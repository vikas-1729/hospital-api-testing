const express = require('express');
const router=express.Router();
const passport=require('passport');
const controller=require('../../../controller/api/v1/doctors');

router.post('/register',controller.register);
router.post('/login',controller.createSession);
router.post('/name',passport.authenticate('jwt',{session:false}),controller.name);
module.exports=router;