const mongoose=require('mongoose');
const config=require('config');

mongoose.connect(config.get('DBHOST'));

const db=mongoose.connection;

db.on('error',console.error.bind('error','console'));

db.once('open',function(){
    console.log('welcome connect to database');

});
module.exports=db;