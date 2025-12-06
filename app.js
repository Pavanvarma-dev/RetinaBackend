const express = require('express');
const app = express();
const db =  require('./util/db');
const Sequalize = require('sequelize');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
app.use(cors("https://harmonious-salamander-0804d0.netlify.app"));


//importing files
const authRoutes = require('./routers/authRoutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(multer({dest:'/img'}).single('image'));

app.use('/auth',authRoutes);

//importing models
const Users = require('./models/Users');
const Posts = require('./models/Posts');
const Comments = require('./models/Comments');
const Likes = require('./models/Likes');
const Follows = require('./models/Follows');

app.use(express.json());

// Set up associations
Users.associate({ Users, Posts, Comments, Likes, Follows });
Posts.association({ Users, Comments, Likes });
Comments.association({ Users, Posts });
Likes.association({ Users, Posts });
Follows.association({ Users, Follows });


db
    .sync({})
    .then(() =>{
        console.log('Database connected');    
    })
    .catch(err => console.log("Error in  running on the server port 5000",err));


PORT = process.env.PORT || 3000
app.listen(3000)