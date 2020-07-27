const express = require('express');
const router=express.Router();

router.use('/patients',require('./patients'));
router.use('/doctors',require('./doctors'));
router.use('/reports',require('./reports'));

module.exports=router;