<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
    <v-container>
      <p class="title">Adicionar um filme</p>
      <v-row>
        <v-col cols="6">
          <!-- <v-text-field
            v-model="form.actors"
            label="Strings"
            type="text"
            :value="form.actors"
            readonly
          /> -->

          <v-text-field
            v-model="form.title"
            label="Título"
            :rules="[(v) => !!v || 'O Título é obrigatório']"
            class="mt-2"
            color="grey draken-3"
            outlined
            flat
          />
          <v-text-field
            v-model="form.poster"
            label="URL do Poster"
            :rules="[(v) => !!v || 'A URL Poster é obrigatório']"
            class="mt-2"
            color="grey draken-3"
            outlined
            flat
          />
          <div class="d-flex">
            <v-text-field
              v-model="form.year"
              label="Ano"
              type="number"
              :rules="[(v) => !!v || 'O Ano é obrigatório']"
              class="mt-2 mr-2"
              color="grey draken-3"
              outlined
              flat
            />
            <v-text-field
              v-model="form.runtime"
              label="Duração (em minutos)"
              type="number"
              :rules="[(v) => !!v || 'A Duração é obrigatório']"
              class="mt-2 ml-2"
              color="grey draken-3"
              outlined
              flat
            />
          </div>
          <v-text-field
            v-model="form.released"
            label="Lançamento (yyyy-mm-dd)"
            :rules="[(v) => !!v || 'A data de lançamento é obrigatório']"
            class="mt-2"
            color="grey draken-3"
            outlined
            flat
          />
          <v-textarea
            v-model="form.plot"
            label="Resumo"
            :rules="[(v) => !!v || 'O resumo é obrigatório']"
            class="mt-2"
            color="grey draken-3"
            outlined
            flat
          />
        </v-col>
        <v-col cols="6">
          <v-select
            v-model="form.countries"
            label="Países"
            :items="countryList"
            :rules="[(v) => !!v || 'Os países são obrigatório']"
            class="mt-2"
            color="grey draken-3"
            outlined
            flat
            multiple
          />
          <v-select
            v-model="form.languages"
            label="Idiomas"
            :items="languageList"
            :rules="[(v) => !!v.length > 0 || 'Os idiomas são obrigatório']"
            class="mt-2"
            color="grey draken-3"
            outlined
            flat
            multiple
          />
          <v-text-field
            v-model="form.director"
            label="Diretor"
            :rules="[(v) => !!v || ' O diretor é obrigatório']"
            class="mt-2"
            color="grey draken-3"
            outlined
            flat
          />
          <v-text-field
            v-model="form.genre"
            label="Categoria"
            :rules="[(v) => !!v || 'A categoria é obrigatório']"
            class="mt-2"
            color="grey draken-3"
            outlined
            flat
          />

          <div class="d-flex d-flex align-center">
            <v-text-field
              v-model="newActor"
              label="Atores"
              :rules="[
                (v) => !!form.actors.length > 0 || 'Os atores são obrigatório',
              ]"
              class="mt-2"
              color="grey draken-3"
              outlined
              flat
              multiple
            />
            <v-icon @click="addActor" class="ml-4 mb-6">mdi-plus</v-icon>
          </div>
          <v-chip-group active-class="primary--text" column>
            <v-chip v-for="tag in form.actors" :key="tag">
              {{ tag }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <v-btn type="submit" :disabled="!valid"> SALVAR</v-btn>
    </v-container>
  </v-form>
</template>

<script>
import swal from "sweetalert";
import { CREATE_MOVIE } from "@/graphql/mutations";

export default {
  data: () => ({
    valid: false,
    form: {
      title: "",
      plot: "",
      poster: "",
      year: "",
      runtime: null,
      released: "",
      countries: [],
      languages: [],
      actors: [],
      director: "",
      genre: "",
    },
    countryList: [
      "Brasil",
      "Argentina",
      "Chile",
      "Colômbia",
      "Equador",
      "Peru",
      "Uruguai",
      "Venezuela",
    ],
    languageList: [
      "Português",
      "Espanhol",
      "Inglês",
      "Francês",
      "Italiano",
      "Alemão",
      "Chinês",
      "Japonês",
    ],
    newActor: "",
    actorsList: [],
    directorList: [],
    genreList: [],
  }),
  methods: {
    addActor() {
      if (this.newActor.trim()) {
        this.form.actors.push(this.newActor);
        this.newActor = "";
      }
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        console.log(this.form);
        this.$apollo
          .mutate({
            mutation: CREATE_MOVIE,
            variables: {
              input: [
                {
                  year: parseInt(this.form.year),
                  title: this.form.title,
                  runtime: parseInt(this.form.runtime),
                  released: this.form.released,
                  poster: this.form.poster,
                  plot: this.form.plot,
                  languages: this.form.languages,
                  genre: {
                    connectOrCreate: {
                      where: {
                        node: {
                          name: this.form.genre.toUpperCase(),
                        },
                      },
                      onCreate: {
                        node: {
                          name: this.form.genre.toUpperCase(),
                        },
                        edge: {
                          genre: this.form.genre.toUpperCase(),
                        },
                      },
                    },
                  },
                  director: {
                    connectOrCreate: {
                      where: {
                        node: {
                          name: this.form.director,
                        },
                      },
                      onCreate: {
                        node: {
                          name: this.form.director,
                        },
                        edge: {
                          movie: this.form.title,
                        },
                      },
                    },
                  },
                  countries: this.form.countries,
                  actors: {
                    connectOrCreate: this.form.actors.map((actor) => {
                      return {
                        where: {
                          node: {
                            name: actor,
                          },
                        },
                        onCreate: {
                          node: {
                            name: actor,
                          },
                          edge: {
                            role: this.form.title,
                          },
                        },
                      };
                    }),
                  },
                },
              ],
            },
          })
          .then(() => {
            swal({
              title: "Filme adicionado com sucesso",
              icon: "success",
              buttons: ["Home", "Adcionar outro filme"],
              dangerMode: true,
            }).then((willDelete) => {
              if (willDelete) {
                this.$refs.form.reset();
              } else {
                this.$router.push("/");
              }
            });
          });
      }
    },
  },
  computed: {
    actorsWhereComp() {
      return this.form.actors.map((actor) => {
        return {
          where: {
            node: {
              name: actor,
            },
          },
          onCreate: {
            node: {
              name: actor,
            },
            edge: {
              role: this.form.title,
            },
          },
        };
      });
    },
    actorsOnCreateComp() {
      return this.form.actors.map((actor) => {
        return {
          onCreate: {
            node: {
              name: actor,
            },
            edge: {
              role: this.form.title,
            },
          },
        };
      });
    },
  },
};
</script>