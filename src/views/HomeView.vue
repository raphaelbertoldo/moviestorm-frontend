<template>
  <div v-if="loading" class="d-flex justify-center mt-16">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <v-container v-else dark class="">
    <div v-if="user && user.rateds.length > 0">
      <SlipMovies
        @getUser="getUser"
        :movies="user ? user.ratedsConnection.edges : ''"
        title="Filmes Favoritos"
        :type="'favorites'"
      />
    </div>
    <div class="mt-6" v-if="user && user.recommendedMovies.length > 0">
      <SlipMovies
        @getUser="getUser"
        :movies="user ? user.recommendedMovies : ''"
        title="Filmes Recomendados"
      />
    </div>
    <div class="mt-6" v-if="movies">
      <SlipMovies
        @getUser="getUser"
        @getMovies="getMovies"
        :movies="movies"
        title="Adicionados recentemente"
        type="AddedRecently"
      />
    </div>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import SlipMovies from "../components/SlipMovies.vue";
import { GET_USER } from "@/graphql/queries";
export default {
  name: "HomeView",
  data: () => ({
    loading: true,
    movies: "",
    user: null,
    moviesFavorites: "",
  }),
  components: {
    SlipMovies,
  },
  apollo: {
    users: {
      query: GET_USER,
      variables: () => ({
        username: localStorage.user,
        where: {
          username: localStorage.user,
        },
      }),
    },
  },
  methods: {
    getMovies() {
      this.$apollo
        .query({
          query: gql`
            query Movies {
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
          `,
        })
        .then(({ data }) => {
          data;

          if (this.user) {
            this.movies = data.movies.map((movie) => {
              for (
                let i = 0;
                i < this.user.ratedsConnection.edges.length;
                i++
              ) {
                if (this.user.ratedsConnection.edges[i].node.id === movie.id) {
                  movie.rating = this.user.ratedsConnection.edges[i].rating;
                  break;
                }
              }
              return movie;
            });

            this.loading = false;
          }
        });
    },
    getUser() {
      console.log("getUser");
      this.$apollo
        .query({
          query: GET_USER,
          variables: {
            username: localStorage.user,
            where: {
              username: localStorage.user,
            },
          },
          fetchPolicy: "network-only",
        })
        .then(({ data }) => {
          this.getMovies();
          this.user = data.users[0];
        });
    },
  },

  created() {
    this.getUser();
  },
  computed: {
    moviesComp() {
      return this.movies;
    },
  },
  watch: {
    $route: function () {
      // this.getMovies();
      // this.getUser();
    },
    movies: function () {
      // this.getMovies();
      // this.getUser();
    },
  },
};
</script>
