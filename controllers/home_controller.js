const Post = require('../models/post');
const user = require('../models/user');
const passport = require('passport');
const { populate } = require('../models/post');

module.exports.home= async function(req,res){

        /*This Code Works if we want to Find all the post of current User*/
        // Post.find({user:res.locals.user._id}).populate('user').exec(function(err,posts){
            // for(post of posts){         
            //     console.log(post.user);
            // }
        //     return res.render('home',{
        //         title:"HackBOOk | Home",
        //         posts:posts
        //     });
        
        // });

    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate: {
                path:'user'
            }
        });
    
        let users = await user.find({});
    
        return res.render('home',{
            title:"HackBook | Home",
            posts:posts,//sending all  posts 
            all_users:users //sending all users as locals
        });

    } catch(err){
        console.log(err,"Error");
    }
}
        
