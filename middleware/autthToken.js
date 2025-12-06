const jwt = require('jsonwebtoken');
require('dotenv').config();


function authToken(req, res, next){
     const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    };

    const token = authHeader.split(' ')[1];
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        // console.log("authorized", req.user);
        next();

    } catch(err){
        return res.status(403).json({ message: 'Invalid Token' });
    }
}

module.exports = authToken;



 