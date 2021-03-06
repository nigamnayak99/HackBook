const User = require('../models/user');

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render("profile",{
            title:"profile",
            profile:user
        });
    })
}
module.exports.post=function(req,res){
    return res.render("post",{
        title:"post"
    });
}
//rendering sign-up page
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'hackBook | Sign Up'
    });
}
//rendering sign-in page
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:'hackBook | Sign In'
    });
}

//getting sign up data
module.exports.create =async  function(req,res){

    try{
        //if password and confirm_password doesnot match 
        if(req.body.password != req.body.confirm_Password){
            return res.redirect('back');
        }
       let user = await User.findOne({email:req.body.email});
       if(!user){
           await User.create(req.body);
           return res.redirect('/users/sign-in');
       }else{
        return res.redirect('back');
       }
    }catch(err){
        if(err){console.log("Error in Finding User in Sign Up 1");return;}
    }




    //if password and confirm_password doesnot match 
    // if(req.body.password != req.body.confirm_Password){
    //     return res.redirect('back');
    // }
    // // trying to find user with input email
    // User.findOne({email:req.body.email},function(err,user){
    //     if(err){console.log("Error in Finding User in Sign Up 1");return;}
    //     if(!user){
    //         User.create(req.body,function(err,user){
    //         if(err){console.log("Error in Finding User in Sign Up 2");return;}
    //         return res.redirect('/users/sign-in');
    //         });
    //     }else{
    //         return res.redirect('back');
    //     }
    // });

}
//sigin in and creating session
module.exports.createSession = function(req,res){
    req.flash('success','Logged In SuccessFully . . .');
    return res.redirect('/');
}
module.exports.destroySession = function(req,res){
    //logout is given by passport
    req.logout();
    req.flash('success','Logged Out SuccessFully . . .');
    return res.redirect('/');
}
