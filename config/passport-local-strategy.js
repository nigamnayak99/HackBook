
const passport = require('passport');


const LocalStartegy = require('passport-local').Strategy;

const User = require('../models/user');

//Authentication Using Passport
passport.use(new LocalStartegy({
    usernameField:'email'
    },
    function(email,password,done){
        //Establishing User
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding User --> Passport')
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid Username/ Password');
                return done(null,false);
            }
            return done(null,user);
        
        });
    }
));

//Searlising the userto decide which key is to 
//be kept in cookie
passport.serializeUser(function(user,done){
    done(null,user.id);

});
//DeSearlising the user cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in Finding user -- > Passport');
            return done(err);
        }
        return done(null,user);
    });
});
//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in , then pass
    //the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signed in
    return res.redirect('/users/sign-in');
}
passport.checkAuthenticationHome= function(req,res,next){
    //if the user is signed in , then pass
    //the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signed in
    return res.redirect('/');
}
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in 
        //user from the session cookie and we are sending this to locals
        // for views
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;