const Sequelize = require('sequelize');
const sequelize = require('../util/db');
const { all } = require('../routers/authRoutes');

const Posts = sequelize.define('posts',{
    postID:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    postImage:{
        type:Sequelize.BLOB('long'),
        allowNull:true
    },
    caption:{
        type:Sequelize.STRING,
        allowNull:false
    },
     category:{
        type:Sequelize.STRING,
        allowNull:false
    },
    likescount:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:0
    }
});

Posts.association = (models) =>{
    Posts.belongsTo(models.Users, {
        foreignKey:'userID',
        onDelete:'CASCADE'
    });
    Posts.hasMany(models.Comments, {
        foreignKey:'postID',
        onDelete:'CASCADE'
    });
    Posts.hasMany(models.Likes, {
        foreignKey:'postID',
        onDelete:'CASCADE'
    });
}

module.exports = Posts;