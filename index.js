const { Console } = require('console');

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
//Setting Express Layouts and static files
const expressLayouts = require('express-ejs-layouts');
//configuring 
const db = require('./config/mongoose');

//Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const { ppid } = require('process');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

//this is scss middleware
//this middleware must be called before 
//server fires up .
app.use(sassMiddleware({
    /* Options */
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));
app.use(express.urlencoded());

app.use(cookieParser());


app.use(express.static('./assets'));

app.use(expressLayouts);
//Extract Style And Script from subpages 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store session cookie in Database
app.use(session({
    name:'hacBook',
    //TODO change secret before deployment
    secret:'blahSomething',
    saveUninitialized:false,
    resave:false,
    cookie: {
        maxAge : (1000*60*100)
    },
    store: new MongoStore({
            mongooseConnection :db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
     )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


//Setting up Router
app.use('/',require('./routes/index'));

//make Server Listen
app.listen(port,function(err){
    if(err){console.log("error",err)};
    console.log(`Server is Running on port: ${port}`);
})