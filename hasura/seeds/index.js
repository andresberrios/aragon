const fetch = require("node-fetch");
const { GraphQLClient } = require("graphql-request");

if (require.main === module) {
  main().catch(e => {
    console.error(e);
    process.exit(1);
  });
}

async function main() {
  let hasuraGraphqlEndpoint = process.env.HASURA_GRAPHQL_ENDPOINT;
  const hasuraAdminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET;
  const authEndpoint = process.env.AUTH_ENDPOINT;

  if (!hasuraGraphqlEndpoint || !hasuraAdminSecret || !authEndpoint) {
    throw new Error("Missing required env vars.");
  }

  if (!hasuraGraphqlEndpoint.endsWith('/v1/graphql')) {
    hasuraGraphqlEndpoint += "/v1/graphql"
  }

  const client = new GraphQLClient(hasuraGraphqlEndpoint, {
    headers: {
      "x-hasura-admin-secret": hasuraAdminSecret
    }
  });

  const query = `
    mutation {
      insert_roles(objects: {role: "user"}) {
        affected_rows
      }
    }
  `;

  await client.request(query);

  const result = await fetch(`${authEndpoint}/auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: "admin@test.com",
      email: "admin@test.com",
      password: "test"
    })
  });
  if (!result.ok) {
    console.error(res.statusText);
    console.error(await res.text());
    throw new Error("Failed to create test user!");
  }
}

module.exports.main = main;
