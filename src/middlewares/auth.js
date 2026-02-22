const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Intentar obtener token de cookie o del header Authorization
    let token = req.cookies.token;
    
    if (!token && req.headers['authorization']) {
        token = req.headers['authorization'].split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ error: "No autorizado user sin token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido o expirado: " + error.message });
    }
};

module.exports = {verifyToken}