const repository = require("../repository/user.repository");
const bcrypt = require('bcrypt');

const saltRounds = 10; 

const ErrorCodes = {
    MISSING_FIELDS: 'ERR_MISSING_FIELDS',
    INVALID_CPF: 'ERR_INVALID_CPF',
    INVALID_EMAIL: 'ERR_INVALID_EMAIL',
    SHORT_PASSWORD: 'ERR_SHORT_PASSWORD',
    WEAK_PASSWORD: 'ERR_WEAK_PASSWORD',
    INVALID_PHONE: 'ERR_INVALID_PHONE',
    INVALID_USER_TYPE: 'ERR_INVALID_USER_TYPE',
    INVALID_BIRTHDATE: 'ERR_INVALID_BIRTHDATE',
};


function sendError(res, code, status=400){
    const messages = {
        [ErrorCodes.MISSING_FIELDS]: "Campos obrigatórios do usuário faltando",
        [ErrorCodes.INVALID_CPF]: "Formato de CPF inválido. Formato esperado: 000.000.000-00",
        [ErrorCodes.INVALID_EMAIL]: "Formato de email inválido",
        [ErrorCodes.SHORT_PASSWORD]: "A senha deve ter no mínimo 8 caracteres",
        [ErrorCodes.WEAK_PASSWORD]: "A senha deve conter pelo menos: uma letra maiúscula, uma minúscula, um número e um caractere especial, e não conter espaços",
        [ErrorCodes.INVALID_PHONE]: "Formato de telefone inválido",
        [ErrorCodes.INVALID_USER_TYPE]: "Tipo deve ser um dos seguintes: docente, admin",
        [ErrorCodes.INVALID_BIRTHDATE]: "Formato de data de nascimento inválido",
    };

    return res.status(status).json({
        error: messages[code] || "Erro desconhecido",
        code
    })
}

async function hashPassword(plainPassword) {
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
}

function passwordChecker(password){
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNoSpaces = /^\S+$/.test(password);

    return (
        hasUpperCase &&
        hasLowerCase &&
        hasDigit &&
        hasSpecialChar &&
        hasNoSpaces
    );
}

exports.getUserByRegistration = async (req, res) => {
    const userId = req.params.matricula;

    repository.findUserByRegistration(userId)
    .then((fetchedUser) => {
        if(!fetchedUser) {
            res.status(404).json({ error: "Usuário não encontrado" });
        }
        else {
            res.status(200).json({ message: "Usuário recuperado com sucesso", user : fetchedUser });
        }
    })
    .catch((err) => {
        console.error("Erro ao buscar usuário pela matrícula:", err);
        res.status(500).json({ message: "Ocorreu um erro" });
    });
};

exports.getUserProfile = async (req, res) => {
    console.log("tentando buscar usuário")
    try {
        const matricula = req.user.registration; 
        console.log(matricula);
        const user = await repository.findUserByRegistration(matricula);
        console.log("user found:", user);

        if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar perfil.", error });
  }
};


exports.getUsers = (req, res) => {
    repository.findAllUsers()
        .then((userList) => {
            if (userList && userList.length > 0) {
                res.status(200).json({ message: "Usuários recuperados com sucesso", users: userList });
            } 
            else {
                res.status(200).json({ message: "Nenhum usuário encontrado", users: [] });
            }
        });
};


exports.createUser = async (req, res) => {
    const { matricula, senha, cpf, nome, telefone, email, datanc, tipo } = req.body;
    console.log("req.body:", req.body);

    const validationError = validateUserFields(matricula, senha, cpf, nome, telefone, email, datanc, tipo);
    if(validationError){
        return sendError(res, validationError);
    }

    try {
        const hashedSenha = await hashPassword(senha);
        console.log("Senha hasheada:", hashedSenha);

        const userData = {
            matricula,
            senha: hashedSenha, 
            cpf,
            nome,
            telefone,
            email,
            datanc,
            tipo
        };

        const newUser = await repository.createUser(userData); 

        res.status(201).json({ message: "Usuário criado com sucesso", user: newUser });
    } catch (err) {
        console.error("Erro criando usuário:", err);
        res.status(500).json({
            error: "Erro criando usuário",
            detail: err?.message || JSON.stringify(err)
        });
    }
};

function validateUserFields(matricula, senha, cpf, nome, telefone, email, datanc, tipo){
    if (!matricula || !senha || !cpf || !nome || !telefone || !email || !datanc || !tipo) {
        return ErrorCodes.MISSING_FIELDS;
    }

    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
        return ErrorCodes.INVALID_CPF;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return ErrorCodes.INVALID_EMAIL;
    }

    if (senha.length < 8) {
        return ErrorCodes.SHORT_PASSWORD;
    }

    if (!passwordChecker(senha)) {
        return ErrorCodes.WEAK_PASSWORD;
    }

    const telefoneDigits = telefone.replace(/\D/g, '');
    if (telefoneDigits.length < 10 || telefoneDigits.length > 11) {
        return ErrorCodes.INVALID_PHONE;
    }

    const allowedTipos = ['docente', 'admin'];
    if (!allowedTipos.includes(tipo.toLowerCase())) {
        return ErrorCodes.INVALID_USER_TYPE;
    }

    if (isNaN(Date.parse(datanc))) {
        return ErrorCodes.INVALID_BIRTHDATE;
    } 

    return null;
};

exports.updateUser = async (req, res) => {
    const matricula = req.params.registration; 
    const {senha, cpf, nome, telefone, email, datanc, tipo } = req.body;

    const validationError = validateUserFields(matricula, senha, cpf, nome, telefone, email, datanc, tipo);
    if(validationError){
        return sendError(res, validationError);
    }

    console.log("req.body:", req.body);
    try {
        const hashedSenha = await hashPassword(senha);
        console.log("matrícula para atualizar:", matricula);
        console.log("Senha hasheada:", hashedSenha);

        const userData = {
            matricula: matricula,
            senha: hashedSenha, 
            cpf,
            nome,
            telefone,
            email,
            datanc,
            tipo
        };

        const newUser = await repository.updateUser(userData); 
        res.status(200).json({ message: "Usuário atualizado com sucesso", user: newUser });
    } 
    catch (err){
        console.error("Erro criando usuário:", err);
        res.status(500).json({
            error: "Erro criando usuário",
            detail: err?.message || JSON.stringify(err)
        });
    }
}

exports.removeUser = async (req, res) => {

    const matricula = req.params.matricula; 

    repository.removeUser(matricula)
    .then((removedUser) => {
        if(!removedUser) {
            res.status(404).json({ error: "Usuário não encontrado" });
        }
        else {
            res.status(200).json({ message: "Usuário desativado com sucesso", user : removedUser });
        }
    })
}