const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: "No se proporcionó un token" });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.TOKEN_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido o expirado" + error.message });
    }
};

module.exports = {verifyToken}