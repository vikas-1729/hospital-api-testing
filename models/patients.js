// defining patient schema
const mongoose= require('mongoose');
// i am going to use phoneNo and name as primary key 
const PatientSchema =new mongoose.Schema({
    phoneNo:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        
    },
    reports:[ // here i have think that a patient can be checked by many doctor each create different reports
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'report'
        }
    ]
    
},{
    timestamps:true
}
);

const patient=mongoose.model('patient',PatientSchema);
module.exports=patient;