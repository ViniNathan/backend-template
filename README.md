# Backend Template

A production-ready Node.js backend template built with Fastify, TypeScript, Prisma, and JWT authentication.

## Features

- **Fastify** - Fast and low overhead web framework
- **TypeScript** - Type-safe development
- **Prisma** - Modern database ORM
- **JWT Authentication** - Secure token-based auth
- **Swagger Documentation** - Auto-generated API docs
- **Zod Validation** - Runtime type checking
- **Error Handling** - Centralized error management
- **ESLint** - Code quality and consistency

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd backend-template
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` and configure your environment:
- `DATABASE_URL` - Your PostgreSQL connection string
- `JWT_SECRET` - A secure random string (min 32 chars)
- `PORT` - Server port (default: 3000)

4. Set up the database
```bash
npx prisma migrate dev
npx prisma generate
```

### Running the Application

Development mode:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

### API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:3000/docs`

### Available Endpoints

#### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login with email and password

#### User Management (Protected)
- `GET /api/users/profile` - Get current user profile
- `PATCH /api/users/profile` - Update user profile
- `DELETE /api/users/profile` - Delete user account

#### Health Check
- `GET /health` - Server health status

### Project Structure

```
src/
├── config/          # Configuration files (env validation)
├── controllers/     # Request handlers
├── middleware/      # Custom middleware (error handling, auth)
├── repositories/    # Data access layer
├── routes/          # Route definitions
├── schemas/         # Zod validation schemas
├── services/        # Business logic
├── types/           # TypeScript type definitions
├── utils/           # Utility functions (JWT, etc.)
└── server.ts        # Application entry point
```

### Scripts

- `npm run dev` - Start development server with hot reload
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run check` - Run both type check and lint

### Database

This template uses Prisma with PostgreSQL. The schema includes:

- **User** - User accounts with email/password
- **RefreshToken** - JWT refresh tokens
- **PasswordResetToken** - Password reset functionality
- **EmailVerificationToken** - Email verification

To create new migrations:
```bash
npx prisma migrate dev --name your_migration_name
```

### Authentication

The template uses JWT tokens with two types:
- **Access Token** - Short-lived (default: 15 minutes)
- **Refresh Token** - Long-lived (default: 7 days)

Protected routes require the `Authorization: Bearer <token>` header.

## License

ISC
