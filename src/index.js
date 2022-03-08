const express = require('express')
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

require('dotenv').config();

// Settings
app.set('port', process.env.PORT || 7777);

// Middlewares (morgan: nos da info del tipo de peticiones)
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: ''})); // Ruta del front

// Routes
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));

// Uploads
app.use('/uploads', express.static(path.resolve('uploads')));

// Starting server (nodemon) y express
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});