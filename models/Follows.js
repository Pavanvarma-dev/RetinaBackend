const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Follows = sequelize.define('follows',{
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },

    followerID:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    followingID:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
});

Follows.association = (models) =>{
    Follows.belongsTo(models.Users,{
        foreignKey:'followerID',
        as:'follower',
      
    })
    Follows.belongsTo(models.Users,{
        foreignKey:'followingID',
        as:'following',

    });
}


module.exports = Follows;