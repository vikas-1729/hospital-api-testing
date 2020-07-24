// defining doctor schema and exporting models to use
const mongoose= require('mongoose');

const DoctorSchema =new mongoose.Schema({
    username:{ //username of doctor
        type:String,
        required:true,
        unique:true
    },
    name:{  //name of doctor
        type:String,
        required:true
    },
    password:{ // password also yiou can add other field liks age degree specific to doctor here i am adding minimal
        type:String,
        required:true
    },
    patients:[{ //array of patients he treated
        type:mongoose.Schema.Types.ObjectId,
        ref:'patient'
    }]
},{
    timestamps:true
});

const doctor=mongoose.model('doctor',DoctorSchema);
module.exports=doctor;
