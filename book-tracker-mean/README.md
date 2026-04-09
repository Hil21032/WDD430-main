# Book Tracker (MEAN Stack)

Book Tracker is a single-page application (SPA) built with MongoDB, Express, Angular, and Node.js.

## Features

- Create a new book entry
- Read and list all books
- Update existing books
- Delete books
- Track reading status, rating, and notes

## Project Structure

- `client/` Angular SPA
- `server/` Node + Express API with MongoDB (Mongoose)

## Rubric Coverage

- Angular component(s):
  - `BookListComponent`
  - `BookFormComponent`
- Angular service(s):
  - `BookService`
- Node web service(s):
  - Express routes at `/api/books`
- MongoDB database:
  - Mongoose `Book` model stored in `booktracker` database
- CRUD support:
  - `POST /api/books` create
  - `GET /api/books` and `GET /api/books/:id` read
  - `PUT /api/books/:id` update
  - `DELETE /api/books/:id` delete

## Run Instructions

### 1. Start MongoDB

Make sure MongoDB is running locally.

### 2. Start the API server

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

API URL: `http://localhost:3000`

### 3. Start the Angular client

Open a second terminal:

```bash
cd client
npm install
npm start
```

Client URL: `http://localhost:4200`

## API Endpoints

- `GET /api/health`
- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`
