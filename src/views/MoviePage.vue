<template>
  <div v-if="loading" class="d-flex justify-center mt-16">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <v-container v-else class="">
    <div class="d-flex align-center pointer" @click="$router.push('/')">
      <v-icon>mdi-chevron-left</v-icon>
      <p class="mt-4">Voltar</p>
    </div>
    <div v-if="loading" class="d-flex justify-center mt-16">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else class="pa-4 border-lg border-1">
      <div class="d-flex">
        <v-img
          :src="
            movie.poster ||
            'https://media.comicbook.com/files/img/default-movie.png?auto=webp'
          "
          max-width="266px"
          min-width="266px"
          min-height="400px"
          max-height="400px"
          class="
            mx-2
            border-lg
            select-hover
            elevation-14
            border-lg
            d-flex
            align-end
          "
        >
        </v-img>
        <div class="d-flex px-1">
          <div style="max-width: 80%">
            <h1 class="mb-n2 ml-2 primary--text">
              {{ movie.title }}
            </h1>
            <div>
              <v-rating
                empty-icon="mdi-star-outline"
                full-icon="mdi-star"
                half-icon=" mdi-star-half-full"
                length="5"
                size="35"
                color="yellow"
                background-color="grey darken-3"
                :value="4"
              >
              </v-rating>
            </div>
            <div class="pa-2 d-flex flex justify-space-between">
              <div>
                <TitleInfo
                  class=""
                  title="Genêro"
                  :subtitle="movie.genre ? movie.genre.name : ''"
                />
                <TitleInfo
                  title="Paises"
                  :subtitle="movie.countries.join(', ')"
                />
                <TitleInfo
                  title="Diretor"
                  :subtitle="movie.director ? movie.director.name : ''"
                />
              </div>
              <div>
                <TitleInfo title="Ano" :subtitle="movie.year" />
                <TitleInfo
                  title="Idiomas"
                  :subtitle="movie.languages.join(', ')"
                />
                <TitleInfo
                  title="Atores"
                  :subtitle="
                    movie.actors
                      ? movie.actors.map((a) => a.name).join(', ')
                      : ''
                  "
                />
                <!-- <TitleInfo
                  title="Duração"
                  :subtitle="`${movie.runtime} minutes`"
                /> -->
              </div>
            </div>
            <div class="d-flex">
              <div class="px-2" style="min-height: 180px">
                <h2 class="primary--text">Descrição</h2>
                <p style="font-size: 14pt">{{ movie.plot }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SlipMovies
      class="mt-6"
      :movies="movie.similarMovies"
      title="Filmes Similares"
    />
    <!-- <pre>{{ movie.title }}</pre> -->
  </v-container>
</template>

<script>
import { GET_MOVIE } from "@/graphql/queries";
import TitleInfo from "@/components/TitleInfo.vue";
import SlipMovies from "@/components/SlipMovies.vue";
export default {
  components: {
    TitleInfo,
    SlipMovies,
  },
  name: "MoviePage",
  data: () => ({
    movie: "",
    actors: "N/A",
    loading: true,
  }),
  props: {
    id: String,
  },
  methods: {
    getMovie() {
      this.$apollo
        .query({
          query: GET_MOVIE,
          variables: {
            id: this.$route.params.id,
            where: {
              id: this.$route.params.id,
            },
          },
        })
        .then(({ data }) => {
          this.loading = false;
          this.movie = data.movies[0];
        });
    },
  },
  created() {
    this.getMovie();
  },
  watch: {
    $route: function () {
      this.loading = true;
      this.getMovie();
    },
  },
};
</script>

<style>
</style>