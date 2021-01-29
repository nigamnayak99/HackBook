const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){

    try{
        await Post.create({
            content:req.body.content,
            user:req.user._id
       });
       req.flash('success','You Created A Post');
       return res.redirect('back');

    }catch(err){
        req.flash('error',err);
        return;
    }

}




module.exports.destroy = async function(req,res){
    try{
        //.id means converting the object id into string
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            req.flash('success','You Deleted a Post');
            return res.redirect('back');
        } else{
            req.flash('error','Post Could Not be Deleted');

            return res.redirect('back');
        }

    }catch(err){
        req.flash('error',err);
        console.log(err,"Error");
        return;
    }
    
}