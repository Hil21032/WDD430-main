# AngularBootstrap3App

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.6.

## MEAN SPA Overview

This project is a Single Page Application named **Book Tracker** built with the MEAN stack:

- **MongoDB**: stores book records in the `angular_bootstrap3_books` database.
- **Express + Node.js**: provides REST endpoints at `/api/books`.
- **Angular**: renders the SPA UI and calls the API through an Angular service.

Implemented CRUD endpoints:

- `POST /api/books` create a book
- `GET /api/books` list books
- `GET /api/books/:id` read one book
- `PUT /api/books/:id` update a book
- `DELETE /api/books/:id` delete a book

Implemented Angular pieces:

- Component: `BooksPageComponent`
- Service: `BookService`

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Run The Full Stack Locally

1. Start MongoDB locally.
2. In one terminal, start the Node API:

```bash
npm run api
```

3. In a second terminal, start Angular:

```bash
npm start
```

4. Open `http://localhost:4200`.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
