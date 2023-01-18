import gql from "graphql-tag";

export const GET_USER = gql`
  query User($where: UserWhere, $username: String) {
    users(where: $where) {
      name
      username
      rateds {
        id
        poster
        title
        year
        genre {
          name
        }
      }
      ratedsConnection {
        edges {
          rating
          node {
            id
            poster
            title
            year
            genre {
              name
            }
          }
        }
      }
      recommendedMovies(username: $username) {
        id
        poster
        title
        year
        genre {
          name
        }
      }
    }
  }
`;

export const GET_MOVIE = gql`
  query Movie($where: MovieWhere, $id: String) {
    movies(where: $where) {
      id
      poster
      plot
      title
      year
      runtime
      countries
      languages
      genre {
        name
      }
      actors {
        name
      }
      director {
        name
      }
      similarMovies(id: $id) {
        id
        poster
        title
        year
        genre {
          name
        }
      }
    }
  }
`;

export const GET_MOVIE_GENRE = gql`
  query Genre($where: GenreWhere) {
    genres(where: $where) {
      name
      movies {
        id
        poster
        title
        year
        genre {
          name
        }
      }
    }
  }
`;

export const GET_GENRES = gql`
  query Genre {
    genres {
      name
      id
    }
  }
`;
