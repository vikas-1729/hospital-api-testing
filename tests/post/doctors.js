
// making test case for doctor register
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../index');
let should = chai.should();
let basicUrl='/api/v1/doctors';
let doctorModel=require('../../models/doctors');
const { expect } = require('chai');
let token;
chai.use(chaiHttp);
//testing doctor register
module.exports.doctorRegister= function(){
    describe('doctor register',()=>{
    it('register successfully',(done)=>{// set basic setup
        let potstData={// this is my data to send
            'username':'v@gmail.com',
            'password':'12345',
            'name':' dr. vikas '
        };
        chai.request(server)
        .post(`${basicUrl}/register`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(potstData)
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.have.property('message').eq('Great you have been register');
            res.body.should.have.nested.property('data.doctor.username').eq(potstData.username);
            res.body.should.have.nested.property('data.doctor.password').eq(potstData.password);
            
            done();
        });


    });
    //register unsuccesfull
    it('register unsuccessfully username already taken',(done)=>{// set basic setup
        let potstData={// this is my data to send
            'username':'v@gmail.com',
            'password':'12345',
            'name':' dr. vikas '
        };
        chai.request(server)
        .post(`${basicUrl}/register`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(potstData)
        .end((err,res)=>{
            res.should.have.status(422);
            res.body.should.have.property('message').eq('Username has been taken');
            done();
        });


    });
});
};
//checking doctor login
module.exports.doctorLogin= function(){
    describe('testing for doctor login',()=>{
    it('if user write right credentials then login suceesfully',(done)=>{
            let postData={
                username:'v@gmail.com',
                password:'12345'
            };
            chai.request(server)
            .post(`${basicUrl}/login`)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(postData)
            .end((err,res)=>{
                 res.should.have.status(200);
                 res.body.should.have.property('message').eql('Logged in sucessfully');
                 res.body.should.have.nested.property('data.token');
                 token=res.body.data.token;
                 
                 done();
            });
    });
    it('if user type wrong credentials then return unsuceesfull login',(done)=>{
        let postData={
            username:'vikas',
            password:'12345'
        };
        chai.request(server)
        .post(`${basicUrl}/login`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(postData)
        .end((err,res)=>{
             res.should.have.status(422);
             res.body.should.have.property('message').eql('Invalid username password');
            done(); 
         });   
    });

});
};
