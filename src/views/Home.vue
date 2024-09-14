<template>
  <div>
    <div>
      <CarouselMovies
        :items="
          bannerMovies.map((m) => {
            return {
              src: m.bgPoster,
              title: m.title,
              plot: m.plot,
              year: m.year,
              gender: m.gender,
            };
          })
        "
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      bannerMovies: [],
    };
  },
};
</script>
