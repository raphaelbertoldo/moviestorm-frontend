<template>
  <div class="">
    <p class="title">{{ title }}</p>
    <!-- <pre>>>>{{ users }}</pre> -->

    <div
      class="d-flex pa-4 border-lg justify-space-between"
      :class="grid ? 'border-1' : 'border-1'"
    >
      <div v-if="!grid" class="d-flex align-center pointer" @click="scrollLeft">
        <v-icon>mdi-chevron-left</v-icon>
      </div>
      <div
        ref="customScroll"
        :class="
          grid
            ? 'flex align-content-start flex-wrap d-flex mx-4 '
            : 'flex mx-4 d-flex custom-scroll set-scroll'
        "
      >
        <div v-for="(movie, m) in movies" :key="m" class="my-4">
          <v-card
            class="mx-2 border-lg select-hover"
            @mouseover="setActiveMovie(m)"
            @mouseleave="resetActiveMovie"
          >
            <v-img
              :src="
                (movie.node ? movie.node.poster : movie.poster) ||
                'https://media.comicbook.com/files/img/default-movie.png?auto=webp'
              "
              :min-width="grid ? '200px' : '220px'"
              class="elevation-14 border-lg d-flex align-end"
            >
              <div v-if="loading" class="d-flex justify-center mt-16"></div>
              <div
                class="d-flex gradient-transp flex align-end px-1"
                style="min-height: 180px; width: 100%"
              >
                <div class="" style="min-width: 100%">
                  <p
                    class="title pointer"
                    @click="
                      $router.push(
                        `/movie/${movie.node ? movie.node.id : movie.id}`
                      )
                    "
                  >
                    {{ movie.node ? movie.node.title : movie.title }}
                  </p>
                  <div v-if="activeMovie === m" class="pa-2 d-flex mt-n4 flex">
                    <p class="primary rounded-lg pa-1" style="font-size: 10pt">
                      {{
                        movie.node ? movie.node.genre.name : movie.genre.name
                      }}
                    </p>
                    <v-spacer></v-spacer>
                    <p>{{ movie.node ? movie.node.year : movie.year }}</p>
                  </div>
                  <RateMovie
                    :loading="loading"
                    v-if="activeMovie === m"
                    :movie="movie"
                    v-model="movie.rating"
                    @likeMovie="likeMovie"
                    :newRating="0"
                  />
                </div>
              </div>
            </v-img>
          </v-card>
        </div>
      </div>
      <div
        v-if="!grid"
        class="d-flex align-center pointer"
        @click="scrollRight"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import RateMovie from "./RateMovie.vue";
import { UPDATE_USER } from "@/graphql/mutations";
export default {
  components: { RateMovie },
  name: "SlipMovies",
  data: () => ({
    activeMovie: null,
    rating: 0,
    users: null,
    loading: false,
    newRating: null,
  }),
  props: ["movies", "title", "type", "grid"],
  methods: {
    likeMovie(rating, id) {
      this.loading = true;
      if (this.type === "favorites") {
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
            this.loading = false;
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

    scrollLeft() {
      this.$refs.customScroll.scrollLeft -= 220;
    },
    scrollRight() {
      this.$refs.customScroll.scrollLeft += 220;
    },
    setActiveMovie(index) {
      this.activeMovie = index;
    },
    resetActiveMovie() {
      this.activeMovie = null;
    },
  },
  computed: {
    movieRatingComp(m) {
      return this.movie[m].rating;
    },
  },
};
</script>
<style scoped>
.set-scroll {
  /* max-height: 250px; */
  overflow-x: scroll;
  overflow-y: none;
  /* padding-right: 15px; */
}

.set-scroll::-webkit-scrollbar {
  width: 4px; /* width of the entire scrollbar */
  height: 0px;
}

.set-scroll::-webkit-scrollbar-track {
  background: transparent; /* color of the tracking area */
}

.set-scroll::-webkit-scrollbar-thumb {
  background-color: rgb(51, 51, 51); /* color of the scroll thumb */
  border-radius: 5px; /* roundness of the scroll thumb */
  border: 1px solid var(--primary-50); /* creates padding around scroll thumb */
}
</style>
