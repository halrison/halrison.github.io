<template>
  <div class="col-md-6">
    <img v-bind:src="article.image" v-bind:alt="article.title" class="img-fluid">
  </div>
  <div class="col-md-4 my-auto">
    <div class="text-center">
      <router-link class=" text-decoration-none" v-bind:to="`/article?id=${article.id}`">
        <h4 class="mt-4" v-text="article.title"></h4>
      </router-link>
      <p class="text-muted" v-text="article.description"></p>
    </div>
  </div>
</template>
<script setup>
  import { ref } from "vue"
  const prop = defineProps(['article'])
  const article = ref(prop.article)
</script>
