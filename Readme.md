# DevArena Backend

This repository contains the backend services for the DevArena project, built with Node.js and Express.js. It provides a simple API endpoint and is configured to handle environment variables and CORS.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

## Features

-   **Express.js Server**: A robust and scalable web server.
-   **CORS Enabled**: Configured to handle Cross-Origin Resource Sharing.
-   **Environment Variable Management**: Uses `dotenv` for secure configuration.

## Technologies Used

-   **Node.js**: JavaScript runtime environment.
-   **Express.js**: Web framework for Node.js.
-   **CORS**: Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
-   **dotenv**: Module to load environment variables from a `.env` file.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js installed on your system.
-   Node.js (LTS version recommended)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd DevArena/backend # Assuming this is where your backend code resides
    ```
2.  **Install NPM packages:**
    ```bash
    npm install
    ```

## Environment Variables

This project uses environment variables for configuration. You need to create a `.env` file in the `backend` directory.

Create a file named `.env` in `c:\Users\peeyu\OneDrive\Desktop\DevArena\backend\` with the following content:

```
PORT=3000
```

**Note**: The `example.env.js` file demonstrates how environment variables are loaded and used. Do not commit your actual `.env` file to version control.

## Running the Application

To start the backend server, navigate to the `backend` directory and run:

```bash
npm start # Or node index.js
```

The server will start on the port specified in your `.env` file (defaulting to 3000 if not specified or if `example.env.js` is used directly). You should see a message in your console: `🙌 Server is running on port:🙌 3000`.

## API Endpoints

### `GET /`

-   **Description**: A simple test endpoint to check if the server is running.
-   **Response**: `he he he`
-   **Example Request**:
    ```
    GET http://localhost:3000/
    ```

## Project Structure

```
DevArena/
├── backend/
│   ├── example.env.js
│   ├── index.js
│   └── package.json
│   └── .env (you will create this file)
└── README.md
```