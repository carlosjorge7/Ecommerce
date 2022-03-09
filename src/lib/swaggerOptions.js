const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce API',
            version: '1.0.0',
            description: 'REST full api for an ecommerce application'
        },
        servers: [
            {
                url: 'http://localhost:7777/api'
            }
        ]
    },
    apis: ['./src/routes/*.js']
}

module.exports = options;
