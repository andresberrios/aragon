import gql from "graphql-tag";

export const GET_USERS = gql`
  query {
    users {
      id
      email
      display_name
    }
  }
`;

export const GET_USER = gql`
  query($id: uuid!) {
    user: users_by_pk(id: $id) {
      id
      email
      display_name
    }
  }
`;
