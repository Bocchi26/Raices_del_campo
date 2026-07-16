const app = require('./app');
const env = require('./config/env');
require('./config/db');

app.listen(env.PORT, () => {
    console.log(`🚀 Servidor ejecutándose en el puerto ${env.PORT}`);
});