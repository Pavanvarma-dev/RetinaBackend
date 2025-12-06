const Sequelize = require('sequelize');

const sequelize = new Sequelize('Retina','postgres','System123',{
    dialect:'postgres',
    host:'localhost',
    logging:console.log,
    port:5432
})

module.exports = sequelize;