<template>
  <div class="mt-n6 d-flex align-center justify-space-between mr-2">
    <v-rating
      :half-increments="true"
      empty-icon="mdi-star-outline"
      full-icon="mdi-star"
      half-icon=" mdi-star-half-full"
      length="5"
      :size="size || 16"
      color="yellow"
      background-color="grey darken-3"
      v-model="rating"
    >
    </v-rating>
    <span type="text--caption">{{ rating }}</span>
  </div>
</template>
TESTESESTESTESTESTESTESTETSTETSTE
<script>
export default {
  name: "RateMovie",
  props: ["movie", "loading", "size", "moviePage"],
  data() {
    return {
      rating: this.movie.rating ? this.movie.rating : this.newRating,
    };
  },
  watch: {
    rating: {
      handler(newValue) {
        this.$emit(
          "likeMovie",
          newValue,
          this.movie.node ? this.movie.node.id : this.movie.id,
          this.type
        );
        console.log(
          "🚀 ~ file: RateMovie.vue:39 ~ handler ~  this.movie.node ? this.movie.node.id : this.movie.id,",
          this.movie.node ? this.movie.node.id : this.movie.id
        );
      },
      deep: true,
    },
  },
};
</script>
