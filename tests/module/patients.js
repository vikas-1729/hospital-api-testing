
let token1="enter your token";//enter your token here
let chai = require('chai');//require chai
let chaiHttp = require('chai-http');
let server = require('../../index');
let should = chai.should();
let basicUrl='/api/v1/doctors';
let doctorModel=require('../../models/doctors');
const { expect } = require('chai');
let token=token1;
chai.use(chaiHttp);
let basicUrl2='/api/v1/patients';
let patienId;
module.exports.patientRegister=function(){// making it in a function so to use later
    let postData={///post data
        name:'vikas',
        address:'gzb',
        phoneNo:'12345'
    };
   it('patient register succesfully return patient',(done)=>{//test for register successfully
        chai.request(server)
        .post(`${basicUrl2}/register`)
        .set({ "Authorization": `Bearer ${token}`})
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(postData)
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Patient created first time');
            res.body.should.have.nested.property('data.patient');// matching all data 
            res.body.should.have.nested.property('data.patient.name').eql(postData.name);
            res.body.should.have.nested.property('data.patient.phoneNo').eql(postData.phoneNo);
            res.body.should.have.nested.property('data.patient.address').eql(postData.address);
            patienId=res.body.data.patient['_id'];// taking it's id so to use later
            done();
        });
   });
   it('patient already register  return patient',(done)=>{// if patient is already register
    chai.request(server)
    .post(`${basicUrl2}/register`)
    .set({ "Authorization": `Bearer ${token}`})
    .set('content-type', 'application/x-www-form-urlencoded')
    .send(postData)
    .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Patient already exist');
            res.body.should.have.nested.property('data.patient');
            res.body.should.have.nested.property('data.patient.name').eql(postData.name);
            res.body.should.have.nested.property('data.patient.phoneNo').eql(postData.phoneNo);
            res.body.should.have.nested.property('data.patient.address').eql(postData.address);
            patienId=res.body.data.patient['_id'];
            done();
    });
});

it('doctor create patient  report  return report if id is  valid ',(done)=>{// creating report
    
    chai.request(server)
    .post(`${basicUrl2}/${patienId}/create-report`)
    .set({ "Authorization": `Bearer ${token}`})
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
        status:'positive'
    })
    .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Report created succesfully');
        res.body.should.have.nested.property('data.report');
        res.body.should.have.nested.property('data.report.doctor');
        res.body.should.have.nested.property('data.report.patient')
        done();
    });
    
});
it('doctor create patient  report  return report if id is not  valid ',(done)=>{// report if id is not valid
    let invalidPatientId="taking any worng id";
    chai.request(server)
    .post(`${basicUrl2}/${invalidPatientId}/create-report`)
    .set({ "Authorization": `Bearer ${token}`})
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
        status:'positive'
    })
    .end((err,res)=>{
        res.should.have.status(422);
        res.body.should.have.property('message').eql('Invalid id');
        done();
    });
    
});
it('getting all report of patient ',(done)=>{
    chai.request(server)
    .get(`${basicUrl2}/${patienId}/all-reports`)//get request
    .set({ "Authorization": `Bearer ${token}`})//set authorization
    .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Reports of patients');
            res.body.should.have.nested.property('data.patient');
            res.body.should.have.nested.property('data.patient.name').eql(postData.name);
            res.body.should.have.nested.property('data.patient.phoneNo').eql(postData.phoneNo);
            res.body.should.have.nested.property('data.patient.address').eql(postData.address);
            res.body.should.have.nested.property('data.reports');
            done();
    });
});
it('getting all report of patient  if id is not  valid ',(done)=>{
    let invalidPatientId="enter any invalid id";
    chai.request(server)
    .get(`${basicUrl2}/${invalidPatientId}/all-reports`)//get request
    .set({ "Authorization": `Bearer ${token}`})//set authorization
    .end((err,res)=>{
        res.should.have.status(422);
        res.body.should.have.property('message').eql('Invalid id');
        done();
    });
    
});
};



