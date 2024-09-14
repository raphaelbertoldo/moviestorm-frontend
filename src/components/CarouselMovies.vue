<template>
  <div>
    <v-carousel
      hide-delimiters
      :show-arrows="true"
      cycle
      transition="fade-transition"
    >
      <v-carousel-item v-for="(item, i) in items" :key="i" eager>
        <div class="d-flex">
          <v-img :src="item.src" max-height="500px" contain>
            <div
              class="gradient-transp-1 d-flex flex"
              style="min-height: 100%; min-width: 100%"
            >
              <div class="mt-auto pa-10 mx-16 px-16">
                <h1>{{ item.title }}</h1>
                <p>{{ item.plot }}</p>
              </div>
            </div>
          </v-img>
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
export default {
  name: "CarouselMovies",
  props: ["items"],
  data: () => ({
    // items: [
    //   {
    //     src: "http://disneyplusbrasil.com.br/wp-content/uploads/2022/12/Avatar-Loak.jpg",
    //   },
    //   {
    //     src: "https://rapforte.com/wp-content/uploads/2022/12/20220929-ovicio-adao-negro-poster.jpg",
    //   },
    //   {
    //     src: "https://s2.glbimg.com/q51LL1OkU4ZMZagPzMEkD7qgnsY=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/A/a/c0ONndQtaQXV8vcGe1Cg/nope-1.jpg",
    //   },
    //   {
    //     src: "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/BBFCCAE666B43C90466E4EFC66D959D2C8348DA9F9FCFE62E633C79B337F9166/scale?width=1200&aspectRatio=1.78&format=jpeg",
    //   },
    // ],
    currentIndex: 0,
  }),
  //   computed: {
  //     currentItem() {
  //       return this.items[this.currentIndex];
  //     },
  //   },
  //   mounted() {
  //     setTimeout(() => {
  //       this.currentIndex = (this.currentIndex + 1) % this.items.length;
  //       setTimeout(arguments.callee, 5000);
  //     }, 5000);
  //   },
};
</script>
