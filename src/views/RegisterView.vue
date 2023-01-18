<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-container>
      <v-row class="text-center mt-16">
        <v-col cols="6" class="mt-16 mx-auto">
          <h2>Cadastro</h2>
          <v-text-field
            v-model="form.name"
            class="mt-6"
            placeholder="Nome"
            label="Nome"
            outlined
          />
          <v-text-field
            v-model="form.username"
            class=""
            placeholder="Username"
            label="Username"
            outlined
          />
          <v-text-field
            v-model="form.password"
            class=""
            placeholder="Senha"
            label="Senha"
            outlined
            type="password"
          />
          <v-col class="">
            <v-btn color="primary" type="submit">Cadastrar</v-btn>
            <v-divider class="transparent mt-4"></v-divider>
            <v-btn
              color="transparent"
              @click="$router.push('/sign-in')"
              :block="false"
            >
              Voltar
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { CREATE_USER } from "../graphql/mutations";
// import { GET_USER } from "../graphql/queries";
export default {
  name: "RegisterView",
  data: () => ({
    form: {
      name: "",
      username: "",
      password: "",
    },
  }),
  methods: {
    submit() {
      localStorage.setItem("user", this.form.username);
      this.$apollo
        .mutate({
          mutation: CREATE_USER,
          variables: {
            input: [
              {
                name: this.form.name,
                username: this.form.username,
                password: this.form.password,
              },
            ],
          },
          // update: (store, { data: { createUsers } }) => {
          //   console.log(
          //     "🚀 ~ file: RegisterView.vue:81 ~ submit ~ store",
          //     store
          //   );

          //   store.writeQuery({
          //     query: GET_USER,
          //     variables: { where: { username: this.form.username } },
          //     data: createUsers,
          //   });

          // },
        })
        .then(({ data }) => {
          data;
          console.log(
            "🚀 ~ file: RegisterView.vue:131 ~ .then ~ data",
            data.createUsers
          );

          setTimeout(() => {
            this.$router.push("/");
          }, 100);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    test() {
      console.log(this.$apollo);
    },
  },
};
</script>

<style>
</style>
