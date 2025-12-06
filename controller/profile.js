const Users = require('../models/Users');
const Follows = require('../models/Follows');

exports.getUserProfile = async(req,res) =>{
  try{
      const {id} = req.params;
    const user = await Users.findByPk(id,{where:{userID:id}});
    if(!user){
        return res.status(404).json({message:"User Not Found"});
    }

    let profilepicbase64 = null;
    if(user.profilePicture){
       profilepicbase64 =user.profilePicture.toString('base64');
    // console.log("picture buffer",user.profilePicture);
    }
    const followers = await Follows.count({where:{followingID:id}});
    const following = await Follows.count({where:{followerID:id}});
    res.status(200).json({id:user.userID,
                            username:user.username,
                            email:user.email, 
                            profilePicture:profilepicbase64,
                            bio:user.bio,"message":"Counted Successfully","followers":followers,"following":following});
    }
    
    catch(err){
        console.error("Error fetching user profile:", err);
        res.status(500).json({message:"Server Error"});
    }
  }

  exports.editprofile = async(req,res) =>{
    try{
        const {username,bio} = req.body;
        const userID =req.params.id;
        const profilePictureBuffer = req.file ? req.file.buffer : null;

        const user = await Users.findByPk(userID);
        if(!user){
            return res.status(404).json({message:"User Not Found"});
        }
        user.username = username || user.username;
        user.bio = bio || user.bio;
        if(profilePictureBuffer){
            user.profilePicture = profilePictureBuffer;
        }
        await user.save();
        res.status(200).json({message:"Profile Updated Successfully"});
    }
    catch(err){ 
        console.error("Error updating profile:", err);
        res.status(500).json({message:"Server Error"});
    }
  }