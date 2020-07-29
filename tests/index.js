process.env.NODE_ENV = 'test';

let testDoctor=require('./module/doctors');// doctor module test
let testPatient=require('./module/patients');// patients module test
let testReport=require('./module/reports'); // reports module test


describe('doctor test', () => {// first for doctor
    testDoctor.doctorRegister();
    testDoctor.doctorLogin();
    
});
// i can also dothis all together but after doctor login i need it;s token so i separate it 
describe('patient test',()=>{// for reports
    testPatient.patientRegister();
});
describe('reports test',()=>{// for all reports
    testReport.reportsStatus();
});