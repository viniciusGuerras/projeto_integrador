const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const repository = require("../repository/user.repository");
const {jwtSecret} = require("../config/jwt.js")

exports.login = async (req, res, next) => {
    const {registration, password} = req.body; 

    console.log("tentando logar com:", registration, password);
    
    if (!registration || !password) {
        return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios' });
    }
        
    try {
        const user = await repository.findUserByRegistration(registration); 

        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        const passwordMatch = await bcrypt.compare(password, user.senha || user.user_password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Senha inválida' });
        }

        console.log(user);
        const token = jwt.sign(
            {
                registration: user.matricula, username: user.nome, role: user.tipo
            },
            jwtSecret,
            { 
                expiresIn: '1h'
            }
        );

        return res.json({ message: 'Login realizado com sucesso', token });
    } catch(error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};
