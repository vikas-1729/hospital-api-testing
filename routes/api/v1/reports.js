const express = require('express');
const router=express.Router();
const passport=require('passport');
const controller=require('../../../controller/api/v1/reports');

router.get('/:status',controller.reportStatus);
module.exports=router;