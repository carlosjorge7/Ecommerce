const express = require('express')
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const options = require('./lib/swaggerOptions');

const app = express();

// Settings
app.set('port', process.env.PORT || 7777);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

const swaggerDocs = swaggerJsDoc(options);

// Routes
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/clientes', require('./routes/clientes.routes'));

// Uploads
app.use('/uploads', express.static(path.resolve('uploads')));

// Starting server (nodemon) y express
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});