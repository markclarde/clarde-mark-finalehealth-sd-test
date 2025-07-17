# Clarde Mark - FinaleHealth SD Test

This is a test project for a **Patient & Visit Management System**, built as part of the **Strongwill IT Solutions Junior Software Developer** assessment.

## Tech Stack

- **Frontend:** Angular (TypeScript)
- **Backend:** NestJS (TypeScript)
- **Database:** MongoDB (via Docker)
- **API Client:** Postman

## Getting Started

### 1. Clone the Repository
```
git clone https://github.com/markclarde/clarde-mark-finalehealth-sd-test.git
cd clarde-mark-finalehealth-sd-test
```

### 2. Docker Setup (For MongoDB + Mongo Express)
- Make sure Docker and Docker Compose are installed:
- Install Docker: [Download Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/)
- Once installed, use the following commands from the project root (where `docker-compose.yml` is located):

Start MongoDB and Mongo Express:
```
docker-compose up -d
```
Stop All Containers:
```
docker-compose down
```
Build or Rebuild Containers (if needed):
```
docker-compose build
docker-compose up --build -d
```
Access Mongo Express (MongoDB UI) using the credentials provided, User: `admin` Password: `admin123` at:
```
http://localhost:8081/
```
MongoDB runs at:
```
mongodb://localhost:27017
```

### 3. Run the Application
Refer to the frontend and backend setup guides in their respective folders:
- Frontend setup: [frontend/README.md](https://github.com/markclarde/clarde-mark-finalehealth-sd-test/blob/main/frontend/README.md)
- Backend setup: [backend/README.md](https://github.com/markclarde/clarde-mark-finalehealth-sd-test/blob/main/backend/README.md)

### 4. API Documentation
- You can import the Postman collection from `postman/PVMS-API.postman_collection.json`.
- Or you can access it online [here](https://www.postman.com/markclarde/clarde-mark-finalehealth-sd-test)
