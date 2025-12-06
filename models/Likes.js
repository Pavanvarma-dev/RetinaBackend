const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Likes = sequelize.define('likes',{
    likeID:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
});

Likes.association = (models) =>{
    Likes.belongsTo(models.Users,{
        foreignKey:'userID',
        onDelete:'CASCADE'
    }),
    Likes.belongsTo(models.Posts,{
        foreignKey:'postID',
        onDelete:'CASCADE'
    })
}


module.exports = Likes;