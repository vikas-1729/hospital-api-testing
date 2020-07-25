const express = require('express');
const router=express.Router();
const controller=require('../../../controller/api/v1/patients');
const passport=require('passport');
router.post('/register',passport.authenticate('jwt',{session:false}),passport.setUserAsDoctor,controller.register);
router.post('/:id/create-report',passport.authenticate('jwt',{session:false}),passport.setUserAsDoctor,controller.createReport);

module.exports=router;