const Posts = require('../models/Posts');
const authToken = require('../middleware/autthToken');
const { post } = require('../routers/authRoutes');
const Users = require('../models/Users');


// Create a new post
exports.postPosts =  async (req, res) => {
    try {
       
        const { caption, category } = req.body;
        userID = req.user.id;
        console.log(userID);
        const imageBuffer = req.file ? req.file.buffer : null;
        console.log("post image buffer", imageBuffer);
        
        const newPost = await Posts.create({
            postImage: imageBuffer,
            caption,
            category,
            userID: req.user.id
        });
        
        res.status(201).json({ message: 'Post Created Successfully', post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

};


exports.getAllPosts = async (req, res) => {
    try {
     
        const {id} = req.params;
            const posts = await Posts.findAll({ where: { userID:id } });

            const postwithImages = posts.map(post => {
                const postData = post.toJSON();
                if (post.postImage) {
                    postData.postImage = post.postImage.toString('base64');
                }
                return postData;
            });
            return res.status(200).json({ postwithImages });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.randomPosts = async(req,res) =>{
    try{
        const posts = await Posts.findAll({
                include:[
                    {
                        model:Users,
                        attributes:['username','profilePicture']
                    }
                ],
                order: Posts.sequelize.random(),
                limit:10
        });

        const postwithImages = posts.map(post => {
            const postData = post.toJSON();
            if (post.postImage && post.user.profilePicture) {
                postData.postImage = post.postImage.toString('base64');
                postData.user.profilePicture = post.user.profilePicture.toString('base64');
            }
            return postData;
        });
        // console.log(postwithImages);
        
        return res.status(200).json({message:"Posts Fetched Successfully", postwithImages });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' }); 
    }
}