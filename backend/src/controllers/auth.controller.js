// auth.controller.js: Controlador de endpoints de autenticacion (registro, login, logout)
const authService = require('../services/auth.service');


const authController = {

            async register(req, res) {

            try {
                                                                            //Cuando alguien haga la petición POST con el JSON(VARIABLES) EXPRESS lo pone dentro del req

                const user = await authService.register(req.body);          //LLamar al servicio (En los servicios se toma la desición de lógica) 

                return res.status(201).json({
                    mensaje: 'Usuario registrado exitosamente',
                    usuario: user
                });

            } catch (error) {

                return res.status(400).json({
                    error: true,
                    mensaje: error.message,
                    codigo: 400
                });

            }

        },

        ////////////////

        async login(req, res) {

            try {

                const { email, password } = req.body;       //Obtención de correo y contraseña mediante desestructuración

                const response = await authService.login(email, password);      //Llamar al service 

                return res.status(200).json(response);      //Devuelve la respuesta

            } catch (error) {

                return res.status(400).json({
                    error: true,
                    mensaje: error.message,
                    codigo: 400
                });

            }

        }



};

module.exports = authController;