<template>
  <loading v-bind:is-full-page="true" v-bind:active="isLoading" />
  <button type="button" class="float-end btn btn-primary" v-on:click="openModal('add')">新增文章</button>
  <table class="table">
    <thead>
      <tr>
        <th>標題</th>
        <th>作者</th>
        <th>建立日期</th>
        <th>公開</th>
        <th>動作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="article in articles" v-bind:key="article.id">
        <td v-text="article.title"></td>
        <td v-text="article.author"></td>
        <td v-text="new Date(article.create_at).toLocaleDateString()"></td>
        <td>{{article.isPublic?'是':'否'}}</td>
        <td>
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-primary" v-on:click="openModal('edit',article.id)">編輯</button>
            <button class="btn btn-outline-danger" v-on:click="openModal('remove',article.id)">移除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination v-bind:pagination="pagination" v-show="pagination.total_pages>1" v-on:paginate="page=>ArticleStore.getArticles(page,'admin')" />
  <ArticleModal ref="addEditModal" v-bind:article="article" />
  <RemoveModal type="文章" ref="removeModal" v-bind:item="article" />
</template>
<script setup>
  import { storeToRefs } from 'pinia'
  import { computed, onMounted, ref } from 'vue'
  import useArticleStore from "@/stores/articles"
  import useLoadingStore from "@/stores/loading"
  import Pagination from "@/components/PaginationBar.vue"
  import ArticleModal from "@/components/ArticleModal.vue"
  import RemoveModal from "@/components/RemoveModal.vue"
  const addEditModal = ref(null)
  const removeModal = ref(null)
  const article = ref({})
  const ArticleStore = useArticleStore()
  const articles = computed(() => ArticleStore.articles)
  const pagination = computed(() => ArticleStore.pagination)
  const { isLoading } = storeToRefs(useLoadingStore())
  onMounted(async function () {
    await ArticleStore.getArticles(1, 'admin')
  })
  function openModal (action, id = '') {
    article.value = {}
    switch (action) {
      case 'add':
        article.value = {
          create_at: new Date().toISOString().split('T')[0],
          tag: []
        }
        addEditModal.value.show()
        break
      case 'edit':
        article.value = articles.value.find(article => article.id === id)
        article.value.create_at = new Date(article.value.create_at).toISOString().split('T')[0]
        addEditModal.value.show()
        break
      case 'remove':
        article.value = articles.value.find(article => article.id === id)
        removeModal.value.show()
        break
    }
  }
</script>