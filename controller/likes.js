const Posts = require('../models/Posts');
const Likes = require('../models/Likes');

exports.likesPost = async (req, res) => {
    try{
        const {id} = req.params;
        const userID = req.user.id;
        const postID = id;

        const posts = await Posts.findOne({where:{postID:id}})
        console.log(posts);
        
        
        if(!posts){
            return res.status(404).json({message:"Post Not Found"});
        }

        const existingUser = await Likes.findOne({ where: {postID,userID} });
        
        let isLiked = false

        if(existingUser){
            await posts.decrement('likescount');
            await existingUser.destroy();
            isLiked = false;
        }
        else{
            await posts.increment('likescount');
            await Likes.create({postID,userID});
            isLiked = true;
        }

        await posts.reload();

        return res.status(200).json({message:"Like status updated", likesCount:posts.likesCount, isLiked});
    }
    catch(err){
        console.error("Error updating like status:", err);
        res.status(500).json({message:"Server Error"});    
    }
}