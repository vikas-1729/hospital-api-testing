
// making test case for doctor register
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../index');
let should = chai.should();


module.exports.doctorRegister=describe('doctor register',()=>{
    
    let url='/api/v1/doctors/register';//url
    
    it('register successfully',(done)=>{// set basic setup
        let potstData={// this is my data to send
            'username':'v@gmail.com',
            'password':'12345',
            'name':' dr. vikas '
        };
        chai.request(server)
        .post(url)
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
    it('register unsuccessfully username already taken',(done)=>{// set basic setup
        let potstData={// this is my data to send
            'username':'v@gmail.com',
            'password':'12345',
            'name':' dr. vikas '
        };
        chai.request(server)
        .post(url)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(potstData)
        .end((err,res)=>{
            res.should.have.status(422);
            res.body.should.have.property('message').eq('Username has been taken');
            done();
        });


    });
});