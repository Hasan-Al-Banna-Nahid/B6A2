# Node.js Booking System Backend

## Live Site URL
[https://b6a2.onrender.com](https://b6a2.onrender.com)

## Introduction
This project is a robust backend system built with Node.js and Express.js, designed to manage user authentication, vehicle information, and booking functionalities. It features role-based access control (admin and user) and is structured into distinct modules for maintainability and scalability.

## Features
*   **User Authentication**: Secure user registration, login, and logout with JWT.
*   **User Management**: Admin-exclusive capabilities to create, view, update, and delete user accounts.
*   **Vehicle Management**: CRUD operations for vehicles, including updating availability, with admin-level access for modifications. Public access for viewing vehicles.
*   **Booking System**: Users and admins can create, view, and update bookings.
*   **Role-Based Access Control**: Differentiates between 'user' and 'admin' roles to secure specific API endpoints.

## Technologies Used
*   **Node.js**: JavaScript runtime environment.
*   **Express.js**: Web application framework for Node.js.
*   **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
*   **PostgreSQL**: Relational database for data storage.
*   **dotenv**: To load environment variables from a `.env` file.
*   **bcryptjs**: For password hashing and security.
*   **jsonwebtoken (JWT)**: For secure authentication and authorization.
*   **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
*   **cookie-parser**: Middleware for parsing cookies.

## Folder Structure

```
.
├───src/
│   ├───app.ts                # Main Express application setup
│   ├───server.ts             # Server entry point, starts the application
│   ├───config/               # Configuration settings (e.g., database connection, JWT secret)
│   │   └───index.ts
│   ├───middleware/           # Express middleware (e.g., authentication middleware)
│   │   └───auth.middleware.ts
│   ├───modules/              # Feature-specific modules
│   │   ├───auth/             # User authentication and authorization
│   │   │   ├───auth.controller.ts
│   │   │   ├───auth.route.ts
│   │   │   └───auth.service.ts
│   │   ├───bookings/         # Booking management
│   │   │   ├───booking.controller.ts
│   │   │   ├───booking.route.ts
│   │   │   └───booking.service.ts
│   │   ├───users/            # User management (CRUD operations)
│   │   │   ├───user.controller.ts
│   │   │   ├───user.route.ts
│   │   │   └───user.service.ts
│   │   └───vehicles/         # Vehicle management (CRUD, availability updates)
│   │       ├───vehices.routes.ts
│   │       ├───vehicle.controller.ts
│   │       └───vehicle.service.ts
│   └───types/                # TypeScript custom type definitions
│       └───index.d.ts
├───.env.example              # Example environment variables file
├───package.json              # Project dependencies and scripts
├───tsconfig.json             # TypeScript compiler configuration
└───... (other configuration files and build outputs)
```

**Responsibilities of each component:**

*   **`config/`**: Manages environment-specific configurations, database connection strings, and other sensitive data.
*   **`middleware/`**: Contains Express middleware functions, such as `authMiddleware` for protecting routes based on user roles.
*   **`modules/`**: Each subdirectory within `modules` represents a distinct feature or domain.
    *   **`*.route.ts`**: Defines API endpoints (routes) for the module and maps them to controller functions.
    *   **`*.controller.ts`**: Handles incoming HTTP requests, processes input, interacts with services, and sends back HTTP responses.
    *   **`*.service.ts`**: Contains the business logic, interacts with the database, and performs complex operations for the module.

## API Endpoints

All API endpoints are prefixed with `/api/v1` implicitly by the Express app setup.

### Auth Module

| Method | Endpoint    | Description                               | Access       |
| :----- | :---------- | :---------------------------------------- | :----------- |
| `POST` | `/signup`   | Register a new user                       | Public       |
| `POST` | `/signin`   | Log in a user and get a JWT               | Public       |
| `POST` | `/signout`  | Log out a user (clears cookie/session)    | Authenticated|

### User Module

| Method | Endpoint        | Description                         | Access |
| :----- | :-------------- | :---------------------------------- | :----- |
| `POST` | `/users`        | Create a new user                   | Public |
| `GET`  | `/users`        | Get all users                       | Admin  |
| `GET`  | `/users/:id`    | Get a user by ID                    | Admin  |
| `PUT`  | `/users/:id`    | Update a user by ID                 | Admin  |
| `DELETE`|`/users/:id`    | Delete a user by ID                 | Admin  |

### Booking Module

| Method | Endpoint            | Description                   | Access             |
| :----- | :------------------ | :---------------------------- | :----------------- |
| `POST` | `/bookings`         | Create a new booking          | User, Admin        |
| `GET`  | `/bookings`         | Get all bookings              | User, Admin        |
| `GET`  | `/bookings/:bookingId`| Get a booking by ID           | User, Admin        |
| `PUT`  | `/bookings/:bookingId`| Update a booking by ID        | User, Admin        |

### Vehicle Module

| Method | Endpoint         | Description                   | Access       |
| :----- | :--------------- | :---------------------------- | :----------- |
| `POST` | `/vehicles`      | Create a new vehicle          | Admin        |
| `GET`  | `/vehicles`      | Get all vehicles              | Public       |
| `GET`  | `/vehicles/:id`  | Get a vehicle by ID           | Public       |
| `PUT`  | `/vehicles/:id`  | Update vehicle availability   | Admin        |
| `DELETE`|`/vehicles/:id`  | Delete a vehicle by ID        | Admin        |

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd Assignment2
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file:**
    Create a file named `.env` in the root directory based on the `.env.example` provided.

    ```
    # .env example
    PORT=5000
    DB_CONNECTION_STRING=your_postgres_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
    Replace `your_postgres_connection_string` with your PostgreSQL database connection string and `your_jwt_secret_key` with a strong secret for JWT signing.

## Running the Project

### Development Mode
To run the project in development mode with live reloading:
```bash
npm run dev
```

### Build and Run (Production)
To build the project for production:
```bash
npm run build
```
Then, to run the compiled JavaScript:
```bash
node dist/server.js
```

## Environment Variables
The following environment variables are required:

*   `PORT`: The port number on which the server will run (e.g., `5000`).
*   `DB_CONNECTION_STRING`: The connection string for your PostgreSQL database.
*   `JWT_SECRET`: A secret key used for signing and verifying JSON Web Tokens.

---
This README provides a comprehensive overview of the project, helping new contributors and users understand its purpose, structure, and how to get started.
