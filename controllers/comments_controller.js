const Comment = require('../models/comment');
const Post = require('../models/post');

//create a comment
module.exports.create = async function(req,res){
    try{
    let post = await Post.findById(req.body.post);
    if(post){
       let comment = await Comment.create({
                        content:req.body.content,
                        post:req.body.post,
                        user:req.user._id
                    });
        post.comments.push(comment);
        post.save();
        res.redirect('/');
    }else{
        return res.redirect('/');
    }

    }catch(err){
        console.log(err,"Error");
        return;
    }
    
    // Post.findById(req.body.post,function(err,post){
    //     if(post){
    //         Comment.create({
    //             content:req.body.content,
    //             post:req.body.post,
    //             user:req.user._id
    //         },function(err,comment){
    //             post.comments.push(comment);
    //             post.save();
    //             res.redirect('/');

    //         });
    //     }
    // });

}

//delete a comment
module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            //if owner of comment matches the current user
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }

    }catch(err){
        console.log(err,"Error");
        return;
    }

    // Comment.findById(req.params.id,function(err,comment){ //finding a comment
    //     if(comment.user == req.user.id){
    //         //if owner of comment matches the current user
    //         let postId = comment.post;
    //         comment.remove();
    //         Post.findById(postId,{$pull:{comments:req.params.id}});
    //          return res.redirect('back');

    //     }else{
    //         return res.redirect('back');
    //     }
    // });
}
