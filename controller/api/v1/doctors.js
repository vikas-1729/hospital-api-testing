const doctorModel=require('../../../models/doctors');
const jsonWebToken=require('jsonwebtoken');
module.exports.register=async function(req,res){
    try{
        let doctor= await doctorModel.findOne({username:req.body.username});//username is unique so to checkif exits or not
        
        if(doctor){
            return res.status(422).json({
                message:'Username has been taken'
            });
        }
        let doctorCreate=await doctorModel.create(req.body);//if not exits create the new one
        return res.status(200).json({
            'message':'Great you have been register'
        });

    }catch(err){
        return res.status(500).json({
            message:'Internal server error'
        });
    }
    
};
// login the doctor once it register
module.exports.createSession= async function(req,res){
    try{
        let doctor=await doctorModel.findOne({username:req.body.username});
        if(!doctor||doctor.password!=req.body.password){
                return res.status(422).json({
                    message:'Invalid username password'
                });
        }
        // doctor is present so return json token
        let token=jsonWebToken.sign(doctor.toJSON(),'hospital',{expiresIn:1000*60*5});
        return res.status(200).json({
            'message':'Logged in sucessfully',
            data:{
                token:token
            }
        });

    }catch(err){
        return res.status(500).json({
            message:'Internal server error'
        });
    }

};
// function we delete later here is only for check
module.exports.name=async function(req,res){
    req.doctor=req.user;
    if(req.doctor){
        console.log(req.isAuthenticated());
        return res.status(200).json({
            message:'all good',
            name:req.doctor.name
        });
    }else{
        return res.status(404).json({
            message:'no logim'
        })
    }
};
