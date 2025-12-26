// ...existing code...
const express = require('express');
const router = express.Router();
const multer = require('multer');
const profile = require('../controller/profile');
const authController = require('../controller/authController');
const postsController = require('../controller/posts');
const LikesController = require('../controller/likes');
const validate = require('../validation/userValidation');
const authToken = require('../middleware/autthToken');
const comments = require('../controller/comments');
const follows = require('../controller/Followsers');
const googleAuthController = require('../controller/googleController');

// Use memoryStorage so req.file.buffer is available
const upload = multer({ storage: multer.memoryStorage() });

router.post('/register',
     upload.single('profilePicture'),
     validate.registerValidation,
     validate.handleValidationErrors,
     authController.registerUser);

router.post('/login', authController.loginUser);
router.get('/profile/:id', profile.getUserProfile);
router.post("/posts" ,authToken, upload.single('postImage'), postsController.postPosts);
router.get("/getposts/:id", authToken, postsController.getAllPosts);
router.post('/editprofile/:id', authToken, upload.single('profilePicture'), profile.editprofile);
router.post('/like/:id', authToken, LikesController.likesPost);
router.get('/randomposts', authToken, postsController.randomPosts);
router.get('/getcomments/:postID', authToken, comments.toGetComments);
router.post('/comments/:postID', authToken, comments.toPostComments);
router.post('/follow', authToken, follows.FollowUser);
router.post('/unfollow', authToken, follows.unFollowUser);
router.get('/getfollowing/:id', authToken, follows.getFollowing);
router.get('/getfollowers/:id', authToken, follows.getFollower);
router.get('/count/:id', authToken, follows.count);
router.post('/googlelogin', googleAuthController.googleLogin);


module.exports = router;
