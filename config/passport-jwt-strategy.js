//requiring passport and jwt strategy
const passport= require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const doctorModel=require('../models/doctors');
const opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'hospital'
}

passport.use(new JWTStrategy(opts,async function(payLoadJWT,done){
    try{
        let doctor=await doctorModel.findById(payLoadJWT._id);
        if(!doctor){
            return done(null,false);
        }
        return done(null,doctor);
    }catch(err){
        console.log(`error ${err}`);
        return done(err,false);
    }
    
})
);
passport.setUserAsDoctor=function(req,res,next){
    if(req.isAuthenticated()){
        req.doctor=req.user;
       
    }
    next();
}