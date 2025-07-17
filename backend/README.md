# Backend Setup Guide

This guide outlines the steps to set up and run the backend of the **PVMS** in development mode.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [NestJS CLI](https://docs.nestjs.com/cli/overview)
- Docker (MongoDB container must be running — see main project README for setup)

## Getting Started

### 1. Navigate to the Backend Directory
```
cd backend
```

### 2. Install Dependencies
```
npm install
```

### 3. Ensure MongoDB Docker Container Is Running
- Make sure your MongoDB container is up and running before starting the backend.
- Docker installation and container setup are detailed in the root project's main `README.md`.
- If so, you can access Mongo Express at:
```
http://localhost:8081/
```

### 4. Set Up Environment Variables
- Create a `.env` file based on the example:
```
cp .env.example .env
```

### 4. Run the Backend Application
```
npm run start:dev
```
- This starts the backend in development mode with hot-reloading.

## API Access
- Once running, access the backend API at:
```
http://localhost:3000/
```
