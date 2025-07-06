const repository = require("../repository/material.repository");

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
