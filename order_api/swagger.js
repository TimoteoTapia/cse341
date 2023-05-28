const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Order API',
        description: 'Order and user'
    },
    host: 'order-api-06ih.onrender.com',
    schemes: ['https']
    // host: 'localhost:8080',
    // schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);