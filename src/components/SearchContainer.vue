<template>
  <div>
    <v-autocomplete
      hide-details
      outlined
      dense
      :loading="loading"
      item-text="title"
      item-value="id"
      v-model="search"
      append-icon="mdi-magnify"
      color="primary lighten-1"
      class="black ml-2"
      :no-data-text="
        query
          ? `Nenhum resultado para ${this.query}`
          : 'Digite o título para buscar'
      "
      :search-input.sync="query"
      :items="query ? items : []"
      :editable="true"
      persistent-hint
      v-bind="$attrs"
    >
      <template v-slot:item="{ item }">
        <div @click="$router.push(`/movie/${item.id}`)" class="d-flex">
          <div>
            <v-img
              :src="item.poster"
              :aspect-ratio="1 / 2"
              max-height="150px"
              min-width="75px"
              contain
            ></v-img>
          </div>
          <div class="ml-2 mt-6 d-flex flex-column">
            <span>{{ item.title }}</span>
            <div class="mt-4">
              <span class="border-2 pa-2">{{ item.year }}</span>
            </div>
          </div>
        </div>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import { SEARCH_MOVIE } from "@/graphql/queries";

export default {
  name: "SearchContainer",
  data: () => ({
    loading: false,
    search: "",
    items: [],
    query: null,
  }),
  methods: {
    findMovies() {
      this.loading = true;
      this.items = [];

      if (this.query) {
        this.$apollo
          .query({
            query: SEARCH_MOVIE,
            variables: {
              title: this.query,
              limit: 10,
            },
          })
          .then(({ data }) => {
            this.loading = false;
            data.fuzzySearchMovies.map((a) =>
              this.items.push({
                title: a.title,
                id: a.id,
                poster: a.poster,
                year: a.year,
              })
            );
          })
          .catch(() => (this.loading = false));
      } else {
        this.loading = false;
        console.log("else");
      }
    },
  },

  watch: {
    query() {
      this.loading = false;
      this.findMovies();
    },
  },
};
</script>
<style>
.v-icon {
  transform: none !important;
}
</style>
