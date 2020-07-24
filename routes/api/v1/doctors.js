const express = require('express');
const router=express.Router();
const controller=require('../../../controller/api/v1/doctors');

router.post('/register',controller.register);

module.exports=router;