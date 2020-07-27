process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let report = require('../models/reports');
//const doctorPost=require('./post/doctorLogin');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);
const postDoctor=require('./post/doctors');
//Our parent block

describe('test', () => {
    
    postDoctor.doctorRegister;




});