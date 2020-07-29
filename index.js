const express=require('express');
const port=8000;

const app=express();
process.env['NODE_CONFIG_DIR'] = __dirname + '/packageConfig/';


const db =require('./config/mongoose');

const JWTstrategy=require('./config/passport-jwt-strategy');
const passport = require('passport');
const cookieParser=require('cookie-parser');
// use to encode post request
app.use(express.urlencoded());
app.use(cookieParser());
app.use(require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`error ${err}`);
        return;
    }
    console.log(`we are connected to port no ${port}`);
    return;
});

module.exports=app;