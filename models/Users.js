const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Users = sequelize.define('users',{
    userID:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    bio:{
        type:Sequelize.STRING,
        allowNull:true
    },
    profilePicture:{
        type:Sequelize.BLOB('long'),    //Bytea for images
        allowNull:true
    }
});


Users.associate = (models) =>{
    Users.hasMany(models.Posts, {
        foreignKey:'userID',
        onDelete:'CASCADE'
    });
    Users.hasMany(models.Likes, {
        foreignKey:'userID',
        onDelete:'CASCADE'
    });
    Users.hasMany(models.Comments, {
        foreignKey:'userID',
        onDelete:'CASCADE'
    });
    
         Users.hasMany(models.Follows, {
             as:"Followers",                          // user can be followed by many Users
             foreignKey:"followerID",
             onDelete:'CASCADE'
         });
     Users.hasMany(models.Follows, {
         as:"Following",                          // user can follow many Users
        foreignKey:"followingID",
       onDelete:'CASCADE'
    });
};


module.exports = Users;
