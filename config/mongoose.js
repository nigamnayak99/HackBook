//importing mongoose
const mongoose = require('mongoose');
//making a connection 
mongoose.connect('mongodb://localhost/hackBook_development',{ useNewUrlParser: true,useUnifiedTopology: true });
//making connection availaible
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Error While Connecting to mongodb"));
db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;