const Sequelize = require('sequelize');
// require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'Retina',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'System123',
    {
    host:'localhost',
    dialect:'postgres',
    logging:console.log,
    port:5432,
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false
    //     }
    // }
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
})

module.exports = sequelize;