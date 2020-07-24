// defining patient schema
const mongoose= require('mongoose');

const PatientSchema =new mongoose.Schema({
    phoneNo:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'doctor'
    },
    report:{
        status:String
    }
});

const patient=mongoose.model('patient',PatientSchema);
module.exports=patient;