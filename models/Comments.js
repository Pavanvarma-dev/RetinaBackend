const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Comments = sequelize.define('comments',{
    commentID:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    comment:{
        type:Sequelize.STRING,
        allowNull:false
    }
});


Comments.association = (models) =>{
    Comments.belongsTo(models.Users, {
        foreignKey:'userID',
        onDelete:'CASCADE'
    })
    Comments.belongsTo(models.Posts, {
        foreignKey:'postID',
        onDelete:'CASCADE'
    })
}
module.exports = Comments;