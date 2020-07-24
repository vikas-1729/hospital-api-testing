const doctorModel=require('../../../models/doctors');

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
            'message':'Greate you have been register'
        });

    }catch(err){
        return res.status(500).json({
            message:'Internal server error'
        });
    }
    
};
