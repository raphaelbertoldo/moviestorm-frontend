<template>
  <v-container>
    <v-row class="text-center mt-16">
      <v-col cols="6" class="mt-16 mx-auto">
        <h2>Login</h2>
        <v-text-field
          v-model="form.username"
          class="mt-6"
          placeholder="Username"
          label="Username"
          outlined
        >
        </v-text-field>
        <v-text-field
          v-model="form.password"
          type="password"
          placeholder="Senha"
          label="Senha"
          outlined
        >
        </v-text-field>
        <v-col class="">
          <v-btn color="primary" @click="submit">Entrar</v-btn>
          <v-divider class="transparent mt-4"></v-divider>
          <v-btn
            color="transparent"
            @click="$router.push('/sign-up')"
            :block="false"
          >
            Cadastrar
          </v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GET_USER } from "@/graphql/queries";
export default {
  name: "LoginView",
  data: () => ({
    user: null,
    form: {
      username: "",
      password: "",
    },
  }),
  methods: {
    submit() {
      localStorage.setItem("user", this.form.username);

      this.$apollo
        .query({
          query: GET_USER,
          variables: { where: { username: this.form.username } },
        })
        .then(({ data }) => {
          if (data.users.length < 1) console.log("Dados incorretos");
          else {
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>