const Follows = require('../models/Follows');
const Users = require('../models/Users');

exports.FollowUser = async (req,res) =>{
    const {followerID,followingID} = req.body;
    try{

        if(followerID === followingID){
            return res.status(400).json({ message: 'User Cannot follow itself' });
        }

        const alreadyFollowed = await Follows.findOne({where:{followerID,followingID}});
        if(alreadyFollowed){
            return res.status(400).json({ message: 'User already followed' });
        }

        const newFollow = await Follows.create({followerID,followingID})
        res.status(200).json({ message: 'Followed Successfully', follow: newFollow });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


exports.unFollowUser = async (req,res) =>{
    const {followerID,followingID} = req.body;
    try{
        const deleted = await Follows.findOne({where:{followerID,followingID}})
        if(deleted){
            await deleted.destroy();
        }else{
            return res.status(404).json({ message: 'User Not Found' });
        }

        res.status(200).json({ message: 'Unfollowed Successfully', follow: deleted });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


exports.getFollower = async (req,res) =>{                        // To know Whom follows You
    const {id} = req.params;
    try{
        const followers = await Follows.findAll({
            where:{followingID:id},
            attributes:['followerID'],
            include :[                                                                                  
                {
                    model:Users,
                    as:'follower',
                    attributes:['username','userID']
                }
            ]
        });
        res.status(200).json({followers});
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


exports.getFollowing = async (req,res) =>{                                //To Know whom you follows
    const {id} = req.params;
    try{
        const following = 
        await Follows.findAll({
            where:{followerID:id},
            attributes:['followingID'],
            include :[                                                                                  
                {
                    model:Users,
                    as:'following',
                    attributes:['username','userID']
                }
            ]
        });
        if(following === null){
            return res.status(404).json({ message: 'User Not Found' });
        }
        res.status(200).json({following}); 
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.count = async (req,res) =>{                                //To Know whom you follows
    const {id} = req.params;
    try{
        const followers = await Follows.count({where:{followingID:id}});
        const following = await Follows.count({where:{followerID:id}});
        res.status(200).json({"message":"Counted Successfully","followers":followers,"following":following}); 
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}