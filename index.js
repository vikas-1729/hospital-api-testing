const express=require('express');
const port=8000;

const app=express();

const db =require('./config/mongoose');

const JWTstrategy=require('./config/passport-jwt-strategy');
// use to encode post request
app.use(express.urlencoded());

app.use(require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log(`error ${err}`);
        return;
    }
    console.log(`we are connected to port no ${port}`);
    return;
});