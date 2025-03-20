### Hexlet tests and linter status:
[![Actions Status](https://github.com/Evoly/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Evoly/frontend-project-12/actions)

# Chat App

It'is a real-time messaging application. The application is divided into channels, each representing a separate chat room. Users can join existing channels, create new ones, or send messages to other registered users.

## Technology Stack

### Frontend
- **React** - A JavaScript library for building user interfaces.
- **Redux Toolkit** - State management for React applications.
- **React Router DOM** - Routing for React applications.
- **Axios** - HTTP client for making API requests.
- **Formik** - Form handling library.
- **Yup** - Schema validation for forms.
- **Socket.IO Client** - Real-time communication with the server.
- **Bootstrap** - CSS framework for styling.
- **i18next** - Internationalization framework.
- **React Toastify** - Toast notifications.
- **Leo Profanity** - Profanity filter.

### Backend
- **Hexlet Chat Server** - A pre-built server for handling real-time chat functionality.

### Development Tools
- **Vite** - Fast build tool for modern web development.
- **ESLint** - JavaScript linter for code quality.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Evoly/frontend-project-12
   cd frontend-project-12

2. **Install dependencies for the server and frontend:**
   ```bash
    npm install
    cd frontend/
    npm install

3. **Running application in development mode:**

    To start the server:
      ```bash
      npm run server
      ```

    To run the frontend in development mode:
      ```bash
      npm run frontend
      ```

    To start both the server and frontend simultaneously:
      ```bash
      npm run start:all
      ```
3. **Running application in production mode:**
    ```bash
    npm run build
    npm run server
    ```

## Deployment Link

You can try the application at the following link: [Chat App](https://frontend-project-12-fmkq.onrender.com/)