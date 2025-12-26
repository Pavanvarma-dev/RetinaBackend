const bcrypt = require('bcrypt');
const  Users  = require('../models/Users');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin =   async (req, res) => {
    const { tokenId } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const googleUser = {
            name: payload.name,
            email: payload.email,
            Profilepicture: payload.picture,
        };

        console.log("Decoding user", googleUser);
        
        
        let user = await Users.findOne({ where: { email: googleUser.email } });   
        console.log("user created", user);
            if (!user) {
                const hashedPassword = await bcrypt.hash(email + process.env.JWT_SECRET, 10);
                user = await Users.create({
                    username: googleUser.name,
                    email: googleUser.email,
                    password: hashedPassword,
                    provider: 'google',
                    profilePicture: googleUser.Profilepicture,
                });
                
            const token = jwt.sign({ id: user.userID, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30m' });
            return res.status(200).json({ message: 'User Logged In Successfully', token, id: user.userID });
        } else {
            return res.status(400).json({ message: 'Email is not verified' });
        }
    } catch (err) {
        console.error('Google login error:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

