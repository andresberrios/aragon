import gql from "graphql-tag";

export const GET_PROCEDURES = gql`
  query {
    procedures(order_by: { updatedAt: desc }) {
      id
      name
      description
      steps
      createdAt
      updatedAt
    }
  }
`;

export const GET_PROCEDURE = gql`
  query($id: uuid!) {
    procedure: procedures_by_pk(id: $id) {
      id
      name
      description
      steps
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_PROCEDURE = gql`
  mutation($values: procedures_insert_input!) {
    operation: insert_procedures(objects: [$values]) {
      returning {
        id
        name
        description
        steps
        createdAt
        updatedAt
      }
    }
  }
`;

export const UPDATE_PROCEDURE = gql`
  mutation($id: uuid!, $values: procedures_set_input!) {
    operation: update_procedures(where: { id: { _eq: $id } }, _set: $values) {
      returning {
        id
        name
        description
        steps
        createdAt
        updatedAt
      }
    }
  }
`;
