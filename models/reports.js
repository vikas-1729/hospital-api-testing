const mongoose=require('mongoose');

const ReportSchema= new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'patient',
        required:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'doctor',
        required:true
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
});

const report= mongoose.model('report',ReportSchema);
module.exports=report;