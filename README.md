![image](https://github.com/rkgupta7463/DB_Integration_ExpressJS/assets/96177171/78085eaa-dc83-4b2d-85a0-f3946b6b8c58)

# CRUD Application with Node.js, Express.js, HTML, CSS, JavaScript, and PostgreSQL

This is a full-stack CRUD application built with Node.js, Express.js, HTML, CSS, JavaScript, and PostgreSQL. It demonstrates the implementation of AJAX, Fetch API, HTTP methods (GET, POST, PUT, DELETE), and PostgreSQL database integration.
Features

1. AJAX & Fetch API: Perform asynchronous operations for a seamless user experience.
2. HTTP Methods: Use GET, POST, PUT, and DELETE for handling different types of client requests.
3. PostgreSQL Integration: Secure and efficient database connections for handling CRUD operations.

# Prerequisites

1. `Node.js (v14.x or higher)`
2. `PostgreSQL (v12.x or higher)`
3. `Git`

# Getting Started

Clone the Repository

    git clone https://github.com/yourusername/your-repo.git

  `cd your-repo`

# Install Dependencies

    npm install

# Setup PostgreSQL Database

`Create a PostgreSQL database:`

    CREATE DATABASE your_database_name;


# Run the database migrations or use a script to set up the necessary tables. Example setup script:

### sql on postgre shell

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100)
    );

## Start the Server

    npm start

#### By default, the server will run on `http://localhost:3000`.

Using the Application

1. Fetch Users

    GET /users

  Fetch all users from the database.

2. Add a User

    POST /create-user

3. Add a new user to the database.

        json
    
        {
            "name": "John Doe",
            "email": "john.doe@example.com"
        }

4. Update a User

        PUT /update/:id

Update an existing user's information.

    json

    {
        "name": "Jane Doe",
        "email": "jane.doe@example.com"
    }

5. Delete a User

        DELETE /delete/:id

    Delete a user from the database.

# Frontend

The frontend is built using HTML, CSS, and JavaScript. It includes a simple interface to add, update, and delete users. The frontend communicates with the backend using Fetch API.
Screenshots

Include screenshots of your application (if applicable) to give users a visual overview.
Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
License

This project is licensed under the MIT License. See the LICENSE file for details.
Contact

If you have any questions or feedback, feel free to reach out:

1. GitHub: `https://github.com/rkgupta7463`
2. LinkedIn: `https://www.linkedin.com/in/rishu-kumar-gupta`
