const { getUserByUsername } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    login: (req, res) => {
        const {username, password} = req.body

        const user = getUserByUsername(username)

        if (!user) {
            return res.status(401).json({error:'Credenciales invalidas'})
        }

        const isMatchPass = bcrypt.compareSync(password, user.password)

        if (!isMatchPass) {
            return res.status(401).json({error:'Credenciales invalidas'})
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            },
            process.env.TOKEN_KEY,
            {expiresIn: '1h'}
        );

        res.json({message: "Login exitoso", bearer_token: token})
    },
    renderLogin: (req, res) => {
        res.render('login', {
            title: 'Login - Portfolio Admin'
        })
    }
}

module.exports = authController;