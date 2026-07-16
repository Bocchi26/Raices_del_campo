// auth.service.js: Logica de registro, login y generacion de JWT
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRepository = require('../repositories/user.repository');
const env = require('../config/env');



const authService = {

    async register(userData) {

        const existingUser = await userRepository.findByEmail(userData.email);   //Buscar si existe el correo

            if (existingUser) {                   //Si existe, se detiene el registro y arroja un error
                throw new Error('El correo ya está registrado');
            }

            const password_hash = await bcrypt.hash(userData.password, 10);  //Se encripta la contraseña

            const newUser = await userRepository.createUser({        //Creación del usuario
                ...userData,         //Con este operador se copian todos los datos y solo se agrega la propiedad password_hash
                password_hash
            });

            return newUser;
                
    },

    //////////////////////

    async login(email, password) {

        const user = await userRepository.findByEmail(email);     //Buscar el usuario por correo

        if (!user) {                                    //Verificar si existe el usuario 
            throw new Error('Correo o contraseña incorrectos');
        }

        const passwordCorrect = await bcrypt.compare(             //Compara la contraseña
            password,
            user.password_hash
        );

        if (!passwordCorrect) {                //Valicación
            throw new Error('Correo o contraseña incorrectos');
        }

        const token = jwt.sign(                        //Generación del token JWT
            {
                id_cliente: user.id_cliente,
                email: user.email,
                rol: user.rol
            },
            env.JWT_SECRET,
            {
                expiresIn: '24h'
            }
        );

        return {                                                //Retorna la respuesta 
            token,
            usuario: {
                id_cliente: user.id_cliente,
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email,
                rol: user.rol
            }
        };
    }

};

module.exports = authService;