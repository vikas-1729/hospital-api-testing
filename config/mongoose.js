const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/Hospital_api_db');

const db=mongoose.connection;

db.on('error',console.error.bind('error','console'));

db.once('open',function(){
    console.log('welcome connect to database');

});
module.exports=db;