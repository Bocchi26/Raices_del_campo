// role.middleware.js: Verifica que el usuario autenticado tenga el rol requerido

const roleMiddleware = (rolPermitido) => {

    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                error: true,
                mensaje: 'Usuario no autenticado',
                codigo: 401
            });
        }

        if (req.user.rol !== rolPermitido) {
            return res.status(403).json({
                error: true,
                mensaje: 'No tienes permisos para acceder a este recurso',
                codigo: 403
            });
        }

        next();
    };

};

module.exports = roleMiddleware;