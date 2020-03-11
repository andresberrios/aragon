# Aragón Admin

![Aragón Logo](https://www.aparthotelaragon.cl/images/logo-aragon.png)

An admin platform for managing various areas of the Aragón Apart Hotel. Areas include:

- Business process management through Procedures and Checklists.
- Registry of income, expenses, and payments.
- Analytics for the business.
- Calendar and bookings management.

## Development

You need Docker and `docker-compose` to run the development environment. The defined services are:

- `db`: PostgreSQL database server.
- `hasura`: Hasura GraphQL engine.
- `hbp`: Hasura Backend Plus engine used for authentication.

To start all the required services just run:

```sh
docker-compose up
```

### Frontend

For the frontend just run:

```sh
cd frontend
npm run serve
```

More info about the frontend [here](./frontend/README.md).
