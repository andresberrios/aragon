# Aragón Admin

![Aragón Logo](https://www.aparthotelaragon.cl/images/logo-aragon.png)

An admin platform for managing various areas of the Aragón Apart Hotel. Areas include:

- Business process management through Procedures and Checklists.
- Registry of income, expenses, and payments.
- Analytics for the business.
- Calendar and bookings management.

## Development

The system is composed of a few different services that should run together.
Most of them are managed by `docker-compose`. Besides that, you also need to run the frontend development server.

Sometimes the Dockerfiles for the services will change or be updated, so you might need rebuild the images (more info below).

Sometimes there will be new migrations for the DB schema, which you will need to run to be able to use the app.

### Services

You need Docker and `docker-compose` to run the development environment. The defined services are:

- `db`: PostgreSQL database server.
- `hasura`: Hasura GraphQL engine.
- `hbp`: Hasura Backend Plus engine used for authentication.

To start all the required services just run:

```sh
docker-compose up
```

To stop them, just interrupt the process with `Ctrl + C`.
To destroy the containers and reset your dev environment, run `docker-compose down`.
To rebuild the Docker images from the Dockerfiles (e.g. in case they have changed), run `docker-compose up --build`.

### Frontend

To serve the frontend in development, just run:

```sh
cd frontend
npm run serve
```

More info about the frontend [here](./frontend/README.md).

### Migrations

When there are new migrations to run, you need to go into the `hasura` directory and install the required dependencies.
Then you can run the `migrate` npm script while having the services running using `docker-compose` as explained above.

```sh
cd hasura
npm install
npm run migrate
```

### Hasura Console

If you need to use the Hasura Console, instead of the `migrate` script mentioned above, you can run `npm run console`.

## Modifying DB Schema

You should use the Hasura Console to modify the DB schema, using its UI directly or running custom SQL scripts through it.
These migrations will get registered automatically by the console and stored in the `hasura/migrations` directory.
These files should be committed to version control so others can apply them in their local environment too as well as in
production when deploying (should happen automatically through GitHub Workflow Action).
