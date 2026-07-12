// auth.middleware.js: Verifica y decodifica el token JWT en las peticiones entrantes
const jwt = require('jsonwebtoken');
const env = require('../config/env');

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;   //Obtener el token header   

    if (!authHeader) {                  //Verificar que el token exista 
        return res.status(401).json({
            error: true,
            mensaje: 'Token no proporcionado',
            codigo: 401
        });
    }

    const token = authHeader.split(' ')[1];   //Obtener solo el token 

    try {

        const decoded = jwt.verify(token, env.JWT_SECRET);          //Toma el token y verifica si está bien firmado, que no haya expirado y que coincida con el JWT_SECRET

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            error: true,
            mensaje: 'Token inválido o expirado',
            codigo: 401
        });

    }


};



module.exports = authMiddleware;
