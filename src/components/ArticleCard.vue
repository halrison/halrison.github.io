<template>
  <div class="col-md-6">
    <img :src="article.image" :alt="article.title" class="img-fluid">
  </div>
  <div class="col-md-4 my-auto">
    <div class="text-center">
      <router-link class=" text-decoration-none" :to="`/article?id=${article.id}`">
        <h4 class="mt-4">{{ article.title }}</h4>
      </router-link>
      <p class="text-muted text-truncate">{{ article.description }}</p>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue"

  const prop = defineProps(['article'])
  const article = ref(prop.article)
</script>