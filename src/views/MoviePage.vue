<template>
  <div v-if="loading" class="d-flex justify-center mt-16">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <v-container v-else class="">
    <!-- <pre>{{ movie }}</pre> -->
    <div class="d-flex align-center pointer" @click="$router.push('/')">
      <v-icon>mdi-chevron-left</v-icon>
      <p class="mt-4">Home</p>
      <!-- >>>{{user}} -->
    </div>
    <div v-if="loading" class="d-flex justify-center mt-16">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else class="pa-4 border-lg border-1">
      <div class="d-flex my-2">
        <v-img
          :src="
            movie
              ? movie.poster
              : 'https://media.comicbook.com/files/img/default-movie.png?auto=webp'
          "
          max-width="300px"
          min-width="300px"
          min-height="400px"
          class="rounded-lg mx-2 select-hover elevation-14 border-lg d-flex align-end"
        >
        </v-img>
        <div class="d-flex pl-2">
          <div style="max-width: 80%">
            <h1 class="mb-n2 ml-2 primary--text">
              {{ movie ? movie.title : `` }}
            </h1>
            <div style="max-width: 60%" class="mt-4">
              <!-- <v-rating`
                empty-icon="mdi-star-outline"
                full-icon="mdi-star"
                half-icon=" mdi-star-half-full"
                length="5"
                size="35"
                color="yellow"
                background-color="grey darken-3"
                :value="4"
              >
              </v-rating> -->

              <RateMovie
                :loading="loading"
                :movie="movie ? movie : ``"
                :newRating="0"
                :size="30"
                @likeMovie="likeMovie"
                :moviePage="true"
              />
            </div>
            <div class="pa-2 d-flex flex justify-space-between">
              <div>
                <TitleInfo
                  class=""
                  title="Genêro"
                  :subtitle="movie ? movie.genre.name : ''"
                />
                <TitleInfo
                  title="Paises"
                  :subtitle="movie ? movie.countries.join(', ') : ``"
                />
                <TitleInfo
                  title="Diretor"
                  :subtitle="movie ? movie.director.name : ''"
                />
              </div>
              <div>
                <TitleInfo title="Ano" :subtitle="movie ? movie.year : ``" />
                <TitleInfo
                  title="Idiomas"
                  :subtitle="movie ? movie.languages.join(', ') : ``"
                />
                <TitleInfo
                  title="Atores"
                  :subtitle="
                    movie ? movie.actors.map((a) => a.name).join(', ') : ''
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
                <p style="font-size: 14pt">{{ movie ? movie.plot : `` }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SlipMovies
      @getUser="getUser"
      @getMovies="getMovie"
      class="mt-6"
      :movies="movie ? movie.similarMovies : ``"
      title="Filmes Similares"
    />
  </v-container>
</template>

<script>
import { GET_MOVIE, GET_USER } from "@/graphql/queries";
import TitleInfo from "@/components/TitleInfo.vue";
import SlipMovies from "@/components/SlipMovies.vue";
import RateMovie from "@/components/RateMovie.vue";
import { UPDATE_USER } from "@/graphql/mutations";
export default {
  components: {
    TitleInfo,
    SlipMovies,
    RateMovie,
  },
  name: "MoviePage",
  data: () => ({
    users: null,
    movie: null,
    actors: "N/A",
    loading: true,
    similiarMovies: null,
  }),
  props: {
    id: String,
  },
  methods: {
    likeMovie(rating, id) {
      if (this.movie && this.movie.rating) {
        this.$apollo
          .mutate({
            mutation: UPDATE_USER,
            variables: {
              update: {
                rateds: [
                  {
                    update: { edge: { rating: rating } },
                    where: {
                      node: {
                        id: id,
                      },
                    },
                  },
                ],
              },
              where: {
                username: localStorage.user,
              },
            },
          })
          .then(({ data }) => {
            data;
            console.log("🚀 ~ file: SlipMovies.vue:124 ~ .then ~ data", data);
            this.$emit("getUser");
            this.newRating = rating;
          });
      } else {
        this.$apollo
          .mutate({
            mutation: UPDATE_USER,
            variables: {
              connect: {
                rateds: [
                  {
                    edge: {
                      rating: rating,
                    },
                    where: {
                      node: {
                        id: id,
                      },
                    },
                  },
                ],
              },
              where: {
                username: localStorage.user,
              },
            },
          })
          .then(({ data }) => {
            data;
            console.log("🚀 ~ file: SlipMovies.vue:124 ~ .then ~ data", data);
            this.$emit("getUser");
            this.$emit("getMovies");
            this.newRating = rating;
            this.loading = false;
          });
      }
    },
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
          data;
          if (this.user) {
            const movieObj = data.movies[0];
            const similiarMoviesObj = data.movies[0].similarMovies;
            console.log(
              "🚀 ~ file: MoviePage.vue:227 ~ .then ~ similiarMoviesObj",
              similiarMoviesObj
            );

            this.similiarMovies = similiarMoviesObj.map((movie) => {
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
            for (let i = 0; i < this.user.ratedsConnection.edges.length; i++) {
              if (this.user.ratedsConnection.edges[i].node.id === movieObj.id) {
                movieObj.rating = this.user.ratedsConnection.edges[i].rating;
                break;
              }
            }
            this.movie = movieObj;
            this.similiarMovies = similiarMoviesObj;

            console.log(
              "🚀 ~ file: MoviePage.vue:154 ~ .then ~ movie",
              this.movie
            );
            this.loading = false;
          }

          // if (this.user) {
          //   this.movies = data.movies.map((movie) => {
          //     for (
          //       let i = 0;
          //       i < this.user.ratedsConnection.edges.length;
          //       i++
          //     ) {
          //       if (this.user.ratedsConnection.edges[i].node.id === movie.id) {
          //         movie.rating = this.user.ratedsConnection.edges[i].rating;
          //         break;
          //       }
          //     }
          //     return movie;
          //   });

          //   this.loading = false;
          // }
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
          fetchPolicy: "cache-first",
        })
        .then(({ data }) => {
          this.user = data.users[0];
          this.getMovie();
        });
    },
  },
  created() {
    this.getUser();
  },
  watch: {
    $route: function () {
      this.loading = true;
      this.getMovie();
    },
  },
};
</script>

<style></style>
