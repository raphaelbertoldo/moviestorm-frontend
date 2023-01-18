<template>
  <div v-if="loading" class="d-flex justify-center mt-16">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <v-container v-else>
    <slip-movies
      @getMovies="getMovies"
      :movies="movies"
      :title="`Filmes de ${this.genre}`"
      :grid="true"
    />
  </v-container>
</template>

<script>
import SlipMovies from "@/components/SlipMovies.vue";
import { GET_MOVIE_GENRE } from "@/graphql/queries";
export default {
  components: { SlipMovies },
  name: "GenrePage",
  data: () => ({
    movies: null,
    genre: "",
    loading: true,
  }),
  methods: {
    getMovies() {
      this.$apollo
        .query({
          query: GET_MOVIE_GENRE,
          variables: {
            where: {
              id: this.$route.params.id,
            },
          },
        })
        .then(({ data }) => {
          console.log("🚀 ~ file: GenrePage.vue:32 ~ .then ~ data", data);
          this.loading = false;
          this.movies = data.genres[0].movies;
          this.genre = data.genres[0].name.toLowerCase();
        });
    },
  },
  created() {
    this.getMovies();
  },
  watch: {
    $route: function () {
      this.getMovies();
    },
  },
};
</script>

<style>
</style>