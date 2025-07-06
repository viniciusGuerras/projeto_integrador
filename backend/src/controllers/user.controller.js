const repository = require("../repository/user.repository");
const bcrypt = require('bcrypt');

const saltRounds = 10; 

async function hashPassword(plainPassword) {
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
}

exports.getUserByRegistration = async (req, res) => {
    const userId = req.params.userId;

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

    if (!matricula || !senha || !cpf || !nome || !telefone || !email || !datanc || !tipo) {
        return res.status(400).json({ error: 'Campos obrigatórios do usuário faltando' });
    }

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
        return res.status(400).json({ error: 'Formato de CPF inválido. Formato esperado: 000.000.000-00' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Formato de email inválido' });
    }

    if (senha.length < 6) {
        return res.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres' });
    }

    const telefoneDigits = telefone.replace(/\D/g, '');
    if (telefoneDigits.length < 10 || telefoneDigits.length > 11) {
        return res.status(400).json({ error: 'Formato de telefone inválido' });
    }

    const allowedTipos = ['docente', 'admin'];
    if (!allowedTipos.includes(tipo.toLowerCase())) {
        return res.status(400).json({ error: `Tipo deve ser um dos seguintes: ${allowedTipos.join(', ')}` });
    }

    if (isNaN(Date.parse(datanc))) {
        return res.status(400).json({ error: 'Formato de data de nascimento inválido' });
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
