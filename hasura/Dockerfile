FROM hasura/graphql-engine:v1.1.0

ENV HASURA_GRAPHQL_ENABLE_CONSOLE=false

CMD graphql-engine --database-url $DATABASE_URL serve --server-port $PORT
