import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation createUsers($input: [UserCreateInput!]!) {
    createUsers(input: $input) {
      users {
        userId
        name
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUsers(
    $connect: UserConnectInput
    $update: UserUpdateInput
    $where: UserWhere
  ) {
    updateUsers(update: $update, where: $where, connect: $connect) {
      users {
        name
        username
      }
    }
  }
`;

export const CREATE_MOVIE = gql`
  mutation createUsers($input: [MovieCreateInput!]!) {
    createMovies(input: $input) {
      movies {
        title
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUsers($where: UserWhere) {
    deleteUsers(where: $where) {
      nodesDeleted
    }
  }
`;
