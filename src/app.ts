import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import authRoutes from './routes/authRoute.js';
import productRoutes from './routes/productRoute.js';

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', '*'],
  credentials: true,
}));
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Management API',
      version: '1.0.0',
      description: 'REST API for managing products and authentication',
    },
    servers: [{ url: 'http://localhost:3002', description: 'Development server' }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          description: 'JWT Bearer token',
        },
      },
    },
  },
  apis: ['./dist/routes/*.js'],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

export default app;