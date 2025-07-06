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
            res.status(404).json({ error: "User not found"});
        }
        else {
            res.status(200).json({ message: "User retrieved sucessfully", user : fetchedUser});
        }
    })
    .catch((err) => {
        console.error("Error fetching user by registration:", err);
        res.status(500).json({ message: "An error occurred" });
    });
};

exports.getUsers = (req, res) => {
    repository.findAllUsers()
        .then((userList) => {
            if (userList && userList.length > 0) {
                res.status(200).json({ message: "Users fetched successfully", users: userList });
            } 
            else {
                res.status(200).json({ message: "No users found", users: [] });
            }
        });
};

exports.createUser = async (req, res) => {
    const { matricula, senha, cpf, nome, telefone, email, datanc, tipo } = req.body;
    console.log("req.body:", req.body);

    if (!matricula || !senha || !cpf || !nome || !telefone || !email || !datanc || !tipo) {
        return res.status(400).json({ error: 'Missing required user fields' });
    }

    try {
        const hashedSenha = await hashPassword(senha);
        console.log("Hashed senha:", hashedSenha);

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

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({
            error: "Error creating user",
            detail: err?.message || JSON.stringify(err)
        });
    }
};


