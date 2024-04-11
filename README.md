## Project Structure Explanation

This document provides a detailed explanation of the structure and key components of our Nest.js backend application.

### Source Code (`src`) Directory

The `src` directory is the main container for the application's source code. Within it, you'll find modules that organize the codebase into a feature-based structure.

#### Modules

Modules are the fundamental building blocks of Nest.js applications. They help organize the code into discrete sections. Each module typically contains controllers, services, and entities which correspond to a particular feature or domain.

- **Controllers** (`controllers`): Controllers handle incoming HTTP requests and return responses to the client. They route the requests to appropriate services.

- **Services** (`services`): Services contain the business logic and can interact with databases to perform CRUD operations on the data.

- **Entities** (`entities`): Entities represent data models, usually mirroring database tables, and are used with ORMs like TypeORM or Mongoose.

- **Data Transfer Objects (DTOs)** (`dto`): DTOs are used to define the data structure for data transfer operations, such as client-server communication, and validate incoming data.

Each feature module will have its own directory, and the application can consist of multiple modules like `auth`, `buyers`, `companies`, `countries`, etc.

### Configuration Files and Root-Level Files

- **`.env`**: Environment-specific variables that can be used throughout the application.

- **`.eslintrc.js`**: Configurations for ESLint, a tool for identifying and reporting on patterns in JavaScript.

- **`.gitignore`**: Specifies intentionally untracked files to ignore when using Git.

- **`.prettierrc`**: Configuration for Prettier, an opinionated code formatter.

- **`docker-compose.yml`**: YAML file defining services, networks, and volumes for Docker containers.

- **`nest-cli.json`**: Configuration file for the Nest CLI. Contains settings specific to the Nest.js toolchain.

- **`package-lock.json`**: Automatically generated file to keep track of exact versions of each package that is installed so that a product is 100% reproducible in the same way.

- **`package.json`**: Defines the project dependencies and includes build and deployment scripts.

- **`Procfile`**: Used to explicitly declare what command should be executed to start your app on platforms like Heroku.

- **`README.md`**: A markdown file containing the project documentation.

- **`tsconfig.build.json`**: The TypeScript compiler configuration file for your production build.

- **`tsconfig.json`**: The TypeScript compiler configuration file for your development environment.

- **`yarn.lock`**: Similar to `package-lock.json`, this is an automatically generated file ensuring consistent installs across machines with Yarn.

### Running the Application

- To run the application locally, ensure that Docker is running and use the `docker-compose up` command which will read the `docker-compose.yml` file to set up your application's environment.


# Authentification et Gestion des Sessions

Notre architecture est conçue pour que le backend gère de manière transparente l'authentification des utilisateurs. Voici comment nous avons organisé le processus :

## Processus d'Authentification

1. **Connexion :**
   Lors de la connexion, notre backend génère un JWT et le stocke dans un cookie HTTP qui est renvoyé au navigateur de l'utilisateur.

2. **Requêtes Frontend :**
   Notre frontend est configuré pour faire des requêtes avec `withCredentials: true`. Ainsi, le navigateur inclut automatiquement les cookies lors des requêtes trans-domaines.

3. **Gestion du JWT par le Backend :**
   À la réception d'une requête, notre backend extrait le JWT du cookie. Un middleware dédié authentifie alors l'utilisateur à partir de ce token.

4. **Autorisation :**
   Si le JWT est valide, l'accès à la ressource demandée est accordé. En cas d'échec de validation, le backend renvoie une erreur `401 Unauthorized`.

## Sécurité et Configuration CORS

- Le cookie JWT, `access_token`, est configuré avec le domaine principal et est marqué comme `Secure` et `HttpOnly`.
- La configuration CORS est soigneusement ajustée pour permettre le partage de cookies entre nos sous-domaines, sans compromettre la sécurité.

## En Résumé

Notre frontend se charge de l'envoi des cookies, tandis que notre backend est responsable de l'authentification, garantissant un processus sécurisé et efficace d'authentification et de gestion des sessions.



### Conclusion

This structured architecture promotes clean code practices and separation of concerns, making our codebase more maintainable and scalable. By adhering to this structure, we facilitate easier development and collaboration on our backend services.


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
