const repository = require("../repository/user.repository");

exports.getUserById = async (req, res) => {
    const userId = req.params.userId;

    if (!/^\d+$/.test(userId)) {
        return res.status(400).json({ error: "Invalid user ID : must be a number" });
    }

    try{
        const user = await repository.findUserById(userId);
        if(!user) {
            return res.status(404).json({ error: "error : User not found"});
        }
        res.json(user);
    }
    catch (err){
        res.status(500).json({error: err.message})
    }
};

exports.getUsers = (req, res) => {
    repository.findAllUsers();
    res.json({ message: "Fetching all users" });
};

exports.createUser = (req, res) => {
    repository.createUser()
    res.status(201).json({ message: "User created successfully" });
};

