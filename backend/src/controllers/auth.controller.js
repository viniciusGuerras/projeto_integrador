const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const repository = require("../repository/user.repository");

const secretKey = process.env.JWT_SECRET || 'theBiggestSecretKeyToEverLive';

exports.login = async (req, res, next) => {
    const {registration, password} = req.body; 

    if (!registration || !password) {
        return res.status(400).json({ message: 'Username and password required'});
    }
        
    try {
        const user = await repository.findUserByRegistration(registration); 

        if (!user) {
            return res.status(401).json({ message: 'User not found'});
        }

        const passwordMatch = await bcrypt.compare(password, user.senha || user.user_password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }


        console.log(user);
        const token = jwt.sign(
            {
                id: user.matricula, username: user.nome, role: user.tipo},
                secretKey,
            { 
                expiresIn: '1h'
            });

            return res.json({ message: 'Login successful', token});
    }catch(error){
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
