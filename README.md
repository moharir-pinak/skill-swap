# Skill Swap Platform

A platform for users to share and exchange skills with each other.

## Features

- User authentication and authorization
- Skill management
- User profile management
- Real-time notifications
- Skill search and filtering

## Tech Stack

### Backend
- Django
- Django REST Framework
- Django Channels
- PostgreSQL
- Redis
- JWT Authentication

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- Socket.IO

## Setup Instructions

### Backend Setup
1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory with:
   ```
   DEBUG=True
   SECRET_KEY=your-secret-key
   DATABASE_URL=your-database-url
   REDIS_URL=your-redis-url
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USE_TLS=True
   EMAIL_HOST_USER=your-email
   EMAIL_HOST_PASSWORD=your-app-password
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file in the frontend directory with:
   ```
   VITE_API_URL=http://localhost:8000/api
   VITE_WS_URL=ws://localhost:8000/ws
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

The project is configured for deployment on:
- Backend: Render.com
- Frontend: Vercel
- Database: Render.com PostgreSQL
- Redis: Render.com Redis

See the deployment guide for detailed instructions.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 