import swaggerAutogen from 'swagger-autogen'
import swaggerSpec from './config/swaggerConfig.js';

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/*.js'];

swaggerAutogen()(outputFile, endpointsFiles, swaggerSpec)