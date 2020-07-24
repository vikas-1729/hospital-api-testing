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
    if(err){
        return done(err,false);
    }
    let doctor=doctorModel.findById(payLoadJWT._id);
    if(!doctor){
        return done(null,false);
    }
    return done(null,doctor);
})
);
module.exports=passport;





