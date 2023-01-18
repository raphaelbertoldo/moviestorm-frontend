<template>
  <v-app dark>
    <v-app-bar app dark v-if="this.appBar === true">
      <div class="flex d-flex justify-space-between">
        <div class="d-flex align-center">
          <router-link to="/">
            <v-icon class="mr-4">mdi-home</v-icon>
          </router-link>
        </div>
        <div class="d-flex align-center">
          <genre-list />
          <v-text-field
            :label="'Buscar filme'"
            hide-details
            outlined
            dense
            append-icon="mdi-magnify"
            color="primary"
            class="black ml-2"
          />
        </div>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <div class="d-flex align-center">
              <v-icon
                dark
                v-bind="attrs"
                v-on="on"
                class="v-menu__activator--flat"
              >
                mdi-account
              </v-icon>
            </div>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title @click="goPage(item.to)" class="pointer">
                <v-icon>{{ item.icon }}</v-icon>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main class="black">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import GenreList from "./components/GenreList.vue";
export default {
  components: { GenreList },
  name: "App",

  data: () => ({
    appBar: true,
    items: [
      { title: "Adicionar Filme", to: "/add-movie", icon: "mdi-plus" },
      { title: "Configurações", to: "/profile", icon: "mdi-cog" },
      { title: "Sair", to: "/sign-in", icon: "mdi-logout" },
    ],
  }),
  methods: {
    goPage(item) {
      if (this.$route.path != item) {
        this.$router.push(item);
        console.log(this.$route.path, item);
      }
    },
  },

  watch: {
    $route: function () {
      if (this.$route.path === "/sign-in" || this.$route.path === "/sign-up") {
        localStorage.removeItem("user");
        this.appBar = false;
      } else {
        this.appBar = true;
      }
    },
  },
};
</script>

