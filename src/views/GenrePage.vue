<template>
  <div v-if="loading" class="d-flex justify-center mt-16">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <v-container v-else>
    <slip-movies
      @getMovies="getMovies"
      @getUser="getUser"
      :movies="movies ? movies : ``"
      :title="`Filmes de ${this.genre}`"
      :grid="true"
      type="genres"
    />
  </v-container>
</template>

<script>
import SlipMovies from "@/components/SlipMovies.vue";
import { GET_MOVIE_GENRE, GET_USER } from "@/graphql/queries";
export default {
  components: { SlipMovies },
  name: "GenrePage",
  data: () => ({
    movies: null,
    users: null,
    genre: "",
    loading: true,
  }),
  methods: {
    getMovies() {
      this.$apollo
        .query({
          query: GET_MOVIE_GENRE,
          where: {
            id: this.$route.params.id,
          },
        })
        .then(({ data }) => {
          data;
          console.log("🚀 ~ file: GenrePage.vue:61 ~ .then ~ data>>>>", data);
          this.genre = data.genres[0].name.toLowerCase();

          if (this.user) {
            this.movies = data.genres[0].movies.map((movie) => {
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
          update: (store) => {
            store.writeQuery({
              query: GET_USER,
              variables: {
                username: localStorage.user,
                where: {
                  username: localStorage.user,
                },
              },
            });
          },
        })
        .then(({ data }) => {
          this.getMovies();
          this.user = data.users[0];
          console.log(this.$apollo);
        });
    },
  },
  created() {
    this.getUser();
  },
  watch: {
    $route: function () {
      this.getUser();
      this.getMovies();
    },
  },
};
</script>

<style></style>
