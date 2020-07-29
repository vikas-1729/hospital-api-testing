process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let report = require('../models/reports');
//const doctorPost=require('./post/doctorLogin');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let doctorModel=require('../models/doctors');
chai.use(chaiHttp);
let postDoctor=require('./post/doctors');
let postPatient=require('./post/patients'); 
//Our parent block

describe('doctor test', () => {
    postDoctor.doctorRegister();
    postDoctor.doctorLogin();
    
});
describe('patient test',()=>{
    postPatient.patientRegister();
});
