<template>
  <loading v-bind:active="isLoading" v-bind:is-full-page="true" />
  <div class="container">
    <div class="row">
      <h1 class=" text-center" v-text="article.title"></h1>
    </div>
    <div class="row">
      <h6 class="text-center" v-text="article.description"></h6>
    </div>
    <img class="d-block mx-auto" v-bind:src="article.image" />
    <p class="row" v-text="article.content"></p>
  </div>
</template>
<script setup>
  import useLoadingStore from "@/stores/loading"
import useArticleStore from "@/stores/articles"
import { storeToRefs } from "pinia"
import { onMounted } from "vue"
import { useRoute } from "vue-router"
  const { isLoading } = storeToRefs(useLoadingStore())
const ArticleStore=useArticleStore(),{getArticle}=ArticleStore,{article}=storeToRefs(ArticleStore)
const route=useRoute()
onMounted(async function(){await getArticle(route.query.id,'customer')})
</script>
<style scoped>
</style>