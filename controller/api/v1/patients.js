const patientModel=require('../../../models/patients');
const moment=require('moment');
const reportModel=require('../../../models/reports');
const doctorModel=require('./../../../models/doctors');
module.exports.register=async function(req,res){
    try{
      //cehcking for authentication
        if(req.isAuthenticated()&&req.doctor){
            let patient =await patientModel.findOne({phoneNo:req.body.phoneNo,name:req.body.name});
            let message='Patient already exist';
            if(!patient){
                patient= await  patientModel.create(req.body);
                message='Patient created first time';
                //now also push that patient in doctor schema
                let doctor=await doctorModel.findById(req.doctor._id);
                doctor.patients.push(patient._id);
                await doctor.save();
                }
            return res.status(200).json({
                message:message,
                data:{
                    patient:patient
                }
            });
        }else{
            return res.status(401).json({
                message:'Unauthorized'
            });
        }
    }catch(err){
        return res.status(500).json({
            message:'Internal server error'
        });
    }
    

};

module.exports.createReport=async function(req,res){
    try{// checking authentication
        if(req.doctor){
            let patient=await patientModel.findById(req.params.id);
            if(!patient){// checking for patient
                return res.status(422).json({
                    message:'Invalid id'
                });
            }
            let report =await reportModel.create({// create report
                patient:req.params.id,
                doctor:req.doctor._id,
                status:req.body.status,
                date:moment().format('MMMM Do YYYY, h:mm:ss a')
            });
            // after creating report pushing to the array of reports of patient
            await patient.reports.push(report._id);
            patient.save();
            
            let reportSend=await reportModel.findById(report.id).populate('patient').populate('doctor');// populate the report
            return res.status(200).json({
                message:'Report created succesfully',
                data:{
                    report:reportSend
                }
            });
            // sending report

        }else{
            return res.status(401).json({
                message:'Unauthorized'
            });
        }

    }catch(err){
        return res.status(500).json({
            message:'Internal server error'
        });
    }
};
module.exports.allReports=async function(req,res){
    try{
        if(req.doctor){
        let patient =await  patientModel.findById(req.params.id).sort('createdAt').populate({
            path:'reports',
            populate:{
                path:'doctor',
                select:'name'
            }
        });
        
        if(!patient){
            return res.status(422).json({
                message:'Invalid id'
            });
        }
        return res.status(200).json({
            message:'Reports of patients',
            data:{
                patient:{// all reports refer to same patient so we us this to reduce redendancy
                    name:patient.name,
                    address:patient.address,
                    phoneNo:patient.phoneNo
                },
                reports:patient.reports
            }
        });}else{
            return res.status(401).json({
                message:'Unauthorized'
            });
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:'Internal server error'
        });
    }
};