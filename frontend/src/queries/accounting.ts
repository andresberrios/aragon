import gql from "graphql-tag";

export const GET_CONTACTS = gql`
  query {
    contacts {
      id
      isPerson
      name
      surname
      idType
      idNum
      birthDate
      phone
      email
      address
    }
  }
`;

export const GET_CONTACT = gql`
  query($id: uuid!) {
    contact: contacts_by_pk(id: $id) {
      id
      isPerson
      name
      surname
      idType
      idNum
      birthDate
      phone
      email
      address
    }
  }
`;

export const CREATE_CONTACT = gql`
  mutation($values: contacts_insert_input!) {
    operation: insert_contacts(objects: [$values]) {
      returning {
        id
        isPerson
        name
        surname
        idType
        idNum
        birthDate
        phone
        email
        address
      }
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation($id: uuid!, $values: contacts_set_input!) {
    operation: update_contacts(where: { id: { _eq: $id } }, _set: $values) {
      returning {
        id
        isPerson
        name
        surname
        idType
        idNum
        birthDate
        phone
        email
        address
      }
    }
  }
`;
