# JamRoom Backend

A real-time collaborative music jamming platform backend built with Node.js, Express, MongoDB, and Socket.IO.

## Live Demo

The backend is deployed on Render: [https://jamroom-wg7a.onrender.com/](https://jamroom-wg7a.onrender.com/)

## Overview

JamRoom Backend provides the server-side infrastructure for a collaborative music jamming application. It handles user authentication, song management, and real-time communication between musicians using WebSockets.

## Features

- **User Authentication**: Secure signup and login with bcrypt password hashing
- **Session Management**: Token-based authentication using encrypted tokens
- **Song Library**: Browse and search songs by title or artist
- **Real-time Communication**: Socket.IO integration for live collaboration
- **Real-time Session Management**:
  - Song selection synchronization across all users
  - Admin-controlled session management
  - User requests for current song information
- **RESTful API**: Well-structured API endpoints for all operations
- **MongoDB Integration**: Persistent data storage

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express 5.x
- **Database**: MongoDB 7.x
- **Real-time**: Socket.IO 4.8.x
- **Authentication**: bcrypt, cryptr
- **Other**: CORS, cookie-parser, dotenv

## Project Structure

```
jamroom-backend/
├── api/
│   ├── auth/
│   │   ├── auth.controller.js
│   │   ├── auth.routes.js
│   │   └── auth.service.js
│   ├── song/
│   │   ├── song.controller.js
│   │   ├── song.routes.js
│   │   └── song.service.js
│   └── user/
│       ├── user.controller.js
│       ├── user.routes.js
│       └── user.service.js
├── middlewares/
│   ├── require-auth.middleware.js
│   └── setupAls.middleware.js
├── services/
│   ├── als.service.js
│   ├── db.service.js
│   ├── logger.service.js
│   ├── socket.service.js
│   └── util.service.js
├── server.js
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/user` - Get all users
- `GET /api/user/:id` - Get user by ID
- `PUT /api/user/:id` - Update user
- `DELETE /api/user/:id` - Delete user

### Songs
- `GET /api/song` - Get all songs (supports text search via query params)
- `GET /api/song/:id` - Get song by ID

## Socket.IO Events

### Client to Server
- `set-user-socket` - Associate user ID with socket connection
- `unset-user-socket` - Remove user ID from socket
- `song-selected` - Broadcast song selection to all users
- `end-session` - Admin ends the current session
- `request-current-song` - User requests current song info
- `current-song` - Admin sends current song info

### Server to Client
- `song-selected` - Notifies all users of song selection
- `end-session` - Notifies all users that session has ended
- `request-current-song` - Admin receives request for current song
- `current-song` - User receives current song information

## Installation

1. Clone the repository:
```bash
git clone <https://github.com/InbalCarmy>
cd jamroom-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3030
NODE_ENV=development
MONGODB_URI=<your-mongodb-connection-string>
SECRET1=<your-encryption-secret>
```

4. Start the development server:
```bash
npm run dev
```

Or for Mac:
```bash
npm run dev:mac
```

## Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon (Windows)
- `npm run dev:mac` - Start development server with nodemon (Mac/Linux)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | No (default: 3030) |
| `NODE_ENV` | Environment mode (development/production) | No |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `SECRET1` | Encryption secret for token generation | Yes |

## CORS Configuration

Development CORS origins:
- `http://127.0.0.1:8080`
- `http://localhost:3000`
- `http://127.0.0.1:5173`
- `http://localhost:5173`

Production: Serves static files from the `public` directory

## Authentication

The authentication system uses:
- **bcrypt**: For password hashing with 10 salt rounds
- **cryptr**: For encrypting user tokens
- **cookies**: For storing authentication tokens

## Database Schema

### User
```javascript
{
  _id: ObjectId,
  username: String,
  password: String (hashed),
  instrument: String,
  isAdmin: Boolean
}
```

### Song
```javascript
{
  _id: ObjectId,
  title: String,
  artist: String,
  createdAt: Timestamp
}
```

## Deployment

The application is configured for deployment on Render. Ensure the following:

1. Set all environment variables in your Render dashboard
2. The `NODE_ENV` should be set to `production`
3. MongoDB connection string must be accessible from Render's servers
4. Build command: `npm install`
5. Start command: `npm start`

## Security Features

- Password hashing with bcrypt
- Token encryption with cryptr
- CORS protection
- Environment variable usage for sensitive data
- Request validation and error handling

## License

ISC

