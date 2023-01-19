<template>
  <v-container>
    <div class="d-flex align-center pointer" @click="$router.push('/')">
      <v-icon>mdi-chevron-left</v-icon>
      <p class="mt-4">Home</p>
    </div>
    <p class="title">Configurações do perfil</p>
    <v-row class="mt-4 d-flex">
      <v-col class="" cols="3">
        <v-list class="transparent">
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :class="{ 'list__item--selected  border-1': selected === index }"
            @click="handleSelected(item, index)"
          >
            <v-list-item-title class="pointer">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col v-if="component === 'update'" cols="5" class="ml-4">
        <v-form @submit.prevent="submit" ref="form">
          <v-text-field
            flat
            v-model="form.name"
            placeholder="name"
            label="name"
            outlined
          />
          <v-text-field
            v-model="form.username"
            placeholder="username"
            label="username"
            outlined
          />
          <div class="d-flex align-end justify-end">
            <v-btn type="submit">SALVAR</v-btn>
          </div>
        </v-form>
      </v-col>
      <v-col v-if="component === 'password'" cols="5" class="ml-4">
        <v-form @submit.prevent="submit" ref="form">
          <v-text-field
            flat
            v-model="form.password"
            placeholder="Senha"
            label="Senha"
            outlined
            type="password"
          />
          <v-text-field
            v-model="passwordMatch"
            placeholder="Confirmar senha"
            label="Confirmar senha"
            outlined
            type="password"
          />
          <div class="d-flex align-end justify-end">
            <v-btn type="submit">SALVAR</v-btn>
          </div>
        </v-form>
      </v-col>
      <v-col v-if="component === 'delete'" class="ml-4">
        Tem certeza que deseja apagar sua conta ?
        <v-btn class="red ml-4" @click="submit">APAGAR</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GET_USER } from "@/graphql/queries";
import { DELETE_USER, UPDATE_USER } from "@/graphql/mutations";
import swal from "sweetalert";

export default {
  name: "UserProfile",
  data() {
    return {
      items: [
        { title: "Configurações da conta", component: "update" },
        { title: "Atualizar senha", component: "password" },
        { title: "Apagar conta", component: "delete" },
      ],
      selected: null,
      component: "update",
      form: {
        username: "",
        name: "",
        password: "",
      },
      passwordMatch: "",
    };
  },
  methods: {
    handleSelected(item, index) {
      console.log(
        "🚀 ~ file: UserProfile.vue:78 ~ username: localStorage.user,",
        localStorage.user
      );
      this.selected = index;
      this.component = item.component;
    },
    getUser() {
      if (this.users) {
        const user = this.users[0];

        this.form = { ...user };
        return user;
      }
    },
    submit() {
      if (this.component === "delete") {
        console.log("delete");
        this.$apollo
          .mutate({
            mutation: DELETE_USER,
            variables: {
              where: { username: this.users[0].username },
            },
          })
          .then(() => {
            this.$router.push("/sign-in");
          });
      } else {
        localStorage.setItem("user", this.form.username);
        this.$apollo
          .mutate({
            mutation: UPDATE_USER,
            variables: {
              update: this.inputsComp,
              where: {
                username: this.users[0].username,
              },
            },
            // update: (store, { data: { updateUsers } }) => {
            //   console.log(
            //     "🚀 ~ file: RegisterView.vue:81 ~ submit ~ store",
            //     store
            //   );

            //   store.writeQuery({
            //     query: UPDATE_USER,
            //     variables: { where: { username: this.form.username } },
            //     data: updateUsers,
            //   });
            //   // console.log(store.readQuery({ query: GET_USER }));
            // },
          })
          .then(({ data }) => {
            // swal("Dados atualzados com sucess", "Something went wrong!");
            swal({
              title: "Dados atualizados com sucesso",
              icon: "success",
              buttons: ["Home", "Fechar"],
              dangerMode: true,
            }).then((willDelete) => {
              if (willDelete) {
                // this.$refs.form.reset();
              } else {
                this.$router.push("/");
              }
            });
            data;
            console.log(
              "🚀 ~ file: UserProfile.vue:145 ~ .then ~ this.$apollo",
              this.$apollo.getClient().cache.data
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    hendleInputsUpdates() {
      if (this.component === "update") {
        const obj = {
          name: this.form.name,
          username: this.form.username,
        };
        return obj;
      }
      if (this.component === "password") {
        const obj = {
          password: this.form.password,
        };
        return obj;
      }
    },
  },
  created() {
    this.getUser();
  },
  computed: {
    userComp() {
      return this.getUser();
    },
    inputsComp() {
      return this.hendleInputsUpdates();
    },
  },

  watch: {
    users: {
      handler() {
        this.getUser();
      },
      deep: true,
    },
  },
  apollo: {
    users: {
      query: GET_USER,
      variables: () => ({
        where: {
          username: localStorage.user,
        },
      }),
    },
  },
};
</script>

<style>
.list__item--selected {
  background-color: #181818;
}
.v-text-field {
  /* background-color: red; */
  border-radius: 15px;
}
</style>