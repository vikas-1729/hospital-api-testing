const reportModel=require('../../../models/reports');

module.exports.reportStatus=async function(req,res){
    try{
        let reports= await reportModel.find({status:req.params.status}).populate({
                path:'patient doctor',
                select:'name '

            }
        );
        if(!reports){
            return res.status(422).json({
                message:'unauthroized'
            });
        }
        return res.status(200).json({
            message:'all reports',
            data:{
                status:req.params.status,
                reports:reports
            }
        });


    }catch(err){
        return res.status(500).json({
            message:'Internal server error'
        });
    }

}
