# Product Management API

A robust REST API for managing products and user authentication built with Express.js, TypeScript, and Prisma.

## Quick Start

```bash
# Clone and install
git clone <repository-url>
cd backend-test-code-express-js-v2
npm install

# Start with Docker (recommended)
docker-compose up -d --build

# API available at http://localhost:3002
# Swagger UI at http://localhost:3002/api-docs
```

## Features

- **User Authentication**: Register and login with JWT tokens
- **Product Management**: CRUD operations for products with filters and pagination
- **Authorization**: Protected endpoints requiring JWT authentication
- **Rate Limiting**: Rate limits on authentication and product mutation endpoints
- **CORS Support**: Multi-domain access support
- **API Documentation**: Swagger UI for interactive API testing
- **Docker Support**: Containerized deployment with docker-compose
- **TypeScript**: Type-safe development with full TypeScript support
- **ES Modules**: Modern ES module system for better code organization

## Tech Stack

- **Runtime**: Node.js 18+ (Alpine Linux in Docker)
- **Language**: TypeScript 5.4+
- **Framework**: Express.js 5.3+
- **Database**: PostgreSQL 15
- **ORM**: Prisma 5.10+
- **Authentication**: JWT with bcryptjs
- **API Documentation**: Swagger/OpenAPI with swagger-jsdoc
- **Module System**: ES Modules (ESM)

## Prerequisites

- Node.js >= 18
- Docker & Docker Compose (optional, for containerized deployment)
- PostgreSQL (included in docker-compose)

## Setup

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd backend-test-code-express-js
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Default `.env` content:
```
DATABASE_URL="postgresql://root:secret@db:5432/product_db?schema=public"
JWT_SECRET="supersecretjwtkey"
PORT=3002
NODE_ENV="development"
```

### 3. Database Setup

#### Option A: Using Docker Compose (Recommended)

```bash
docker-compose up -d --build
```

This will start PostgreSQL and create the database automatically.

#### Option B: Manual PostgreSQL Setup

Ensure PostgreSQL is running, then run migrations:

```bash
npx prisma migrate dev --name init
```

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

## Development

Start the development server with hot reload:

```bash
npm run dev
```

Server runs on `http://localhost:3000` (or `http://localhost:3002` with Docker)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get tokens

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (requires auth)
- `PUT /api/products/:id` - Update product (requires auth)
- `DELETE /api/products/:id` - Delete product (requires auth)

### Documentation
- `GET /api-docs` - Swagger UI documentation

## API Documentation

Interactive API documentation is available at:
- **Local**: `http://localhost:3000/api-docs`
- **Docker**: `http://localhost:3002/api-docs`

### Example API Usage

#### Register User
```bash
curl -X POST http://localhost:3002/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```
Response includes `authentication_token` - save this for protected endpoints.

#### Get All Products
```bash
curl http://localhost:3002/api/products
```

#### Get Products with Filters
```bash
# Search by title
curl "http://localhost:3002/api/products?search=shirt"

# Filter by category
curl "http://localhost:3002/api/products?category=Clothes"

# Pagination
curl "http://localhost:3002/api/products?limit=10&page=2"
```

#### Create Product (requires auth)
```bash
curl -X POST http://localhost:3002/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Awesome T-Shirt",
    "price": 99.99,
    "category": "Clothes",
    "images": ["https://placeimg.com/640/480/any"],
    "description": "High-quality cotton t-shirt"
  }'
```

#### Update Product
```bash
curl -X PUT http://localhost:3002/api/products/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Updated T-Shirt",
    "price": 79.99
  }'
```

#### Delete Product
```bash
curl -X DELETE http://localhost:3002/api/products/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Rate Limiting

- **Auth Endpoints**: 3 requests per 60 seconds
- **Product Mutations**: 1 request per 5 seconds

## Build and Production

### Build TypeScript
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## Docker Deployment

### Build Docker Image
```bash
docker build -t product-api .
```

### Run with Docker Compose
```bash
docker-compose up -d --build
```

The API will be available at `http://localhost:3002`

**Note**: The first run will automatically sync the Prisma schema with the database.

## Project Structure

```
src/
├── app.ts                 # Express app setup
├── server.ts             # Server entry point
├── config/
│   └── prisma.ts        # Prisma client instance
├── controllers/
│   ├── authController.ts
│   └── productController.ts
├── services/
│   ├── authService.ts
│   └── productService.ts
├── repositories/
│   ├── authRepository.ts
│   └── productRepository.ts
├── routes/
│   ├── authRoute.ts
│   └── productRoute.ts
├── middlewares/
│   ├── authMiddleware.ts
│   └── rateLimiter.ts
└── dtos/
    ├── auth.dto.ts
    ├── product.dto.ts
    └── user.dto.ts
```

## Database Schema

### User Table
- `id`: integer (primary key)
- `username`: string (unique)
- `password`: string (hashed)
- `createdAt`: timestamp

### Product Table
- `id`: integer (primary key)
- `title`: string
- `price`: decimal
- `description`: string (optional)
- `category`: string
- `images`: string array
- `createdAt`: timestamp
- `createdBy`: string
- `createdById`: string
- `updatedAt`: timestamp
- `updatedBy`: string
- `updatedById`: string

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. User registers/logs in to get `authentication_token` and `refresh_token`
2. Include the `authentication_token` in the Authorization header: `Bearer <token>`
3. Protected endpoints validate the token and extract user information

## Error Handling

All endpoints return JSON responses with appropriate HTTP status codes:

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Missing or invalid token
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://... |
| JWT_SECRET | Secret key for JWT signing | supersecretjwtkey |
| PORT | Server port | 3000 |
| NODE_ENV | Environment (development/production) | development |

## Security Considerations

- Passwords are hashed using bcryptjs
- JWT tokens expire (auth tokens: 1 hour, refresh tokens: 7 days)
- Rate limiting prevents brute force attacks
- CORS configured for specified domains
- Input validation on all endpoints

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Verify DATABASE_URL in `.env`
- Check database credentials

### Prisma Client Not Generated
```bash
npm run prisma:generate
```

### Port Already in Use
Change PORT in `.env` or kill the process using the port

## License

ISC
