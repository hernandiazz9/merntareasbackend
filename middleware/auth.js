const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
    //leer token del header
    const token = req.header('x-auth-token');

    console.log(token);
    
    //revisar si no hay token
    if(!token){
        return res.status(401).json({msg: 'No hay token, Permiso no VALIDO'})
    }

    //validar token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        res.status(401).json ({ msg: 'Token no válido'})
    }

}