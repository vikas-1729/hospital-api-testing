let chai = require('chai');//require chai
let chaiHttp = require('chai-http');
let server = require('../../index');
let should = chai.should();
let basicUrl='/api/v1/reports';
const { expect } = require('chai');
chai.use(chaiHttp);
//let basicUrl='/api/v1/reports';
module.exports.reportsStatus=function(){
    describe('testing for report route',()=>{// for this testing either for given status report is found aur internal server error
        let status='positive';
        it('report for all particular status',(done)=>{
            chai.request(server)
            .get(`${basicUrl}/${status}`)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.have.property('message').eq('all reports');
                res.body.should.have.property('data');
                res.body.should.have.nested.property('data.status').eq(status);
                res.body.should.have.nested.property('data.reports');
                done();
            })
        });
    })
};
