<template>
  <div>
    <p class="text-caption primary--text">
      {{ title }}
    </p>
    <p class="mt-n4">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: "TitleInfo",
  props: ["title", "subtitle"],
};
</script>

<style>
</style>