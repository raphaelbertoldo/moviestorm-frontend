// stores/counter.js
import { defineStore } from "pinia";

export const useMoviesStore = defineStore("movies", {
  state: () => {
    return { mainBanners: [] };
  },
  actions: {
    SET_MAIN_BANNERS() {
      this.mainBanners = [...this.mainBanners];
    },
  },
  getters: {
    mainBanners(state) {
      return state.mainBanners;
    },
  },
});
