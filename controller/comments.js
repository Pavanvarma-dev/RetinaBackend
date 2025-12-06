const Posts = require('../models/Posts');
const Comments = require('../models/Comments');
const Users = require('../models/Users');

exports.toPostComments = async (req, res) => {
    const { postID } = req.params;
    const userID = req.user.id;
   try{
     const newCommenst  = await Comments.create({
        comment: req.body.comment,
        postID,
        userID
    })
    res.status(200).json({ message: 'Comment Created Successfully', comment: newCommenst });
   }
   catch(err){
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
   }
}

exports.toGetComments = async (req,res) =>{
    const {postID}= req.params

    try{
        const commentsAll = await Comments.findAll({where:{
            postID:postID
        }})

        res.status(200).json({"comments":commentsAll});
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}