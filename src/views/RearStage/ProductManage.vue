<template>
  <loading v-bind:is-full-page="true" v-bind:active="isLoading" />
  <button type="button" class="btn btn-primary float-end" v-on:click="openModal('add')">新增商品</button>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>分類</th>
        <th>產品名稱</th>
        <th class="text-end">原價</th>
        <th class="text-end">售價</th>
        <th class="text-center">是否啟用</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" v-bind:key="product.id">
        <td v-text="product.category"></td>
        <td v-text="product.title"></td>
        <td v-text="currency(product.origin_price)" class="text-end"></td>
        <td v-text="currency(product.price)" class="text-end"></td>
        <td v-bind:class="product.is_enabled===1?'text-success':text-danger" class="text-center">
          <span v-text="`${product.is_enabled===1?'啟':'停'}用`"></span>
        </td>
        <td>
          <div class="btn-group">
            <button v-on:click="openModal('modify',product.id)" class="btn btn-outline-primary btn-sm">編輯</button>
            <button v-on:click="openModal('remove',product.id)" class="btn btn-outline-danger btn-sm">移除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination v-bind:pagination="pagination"  v-show="pagination.total_pages>1" v-on:paginate="page=>ProductStore.getProducts(page,'admin')"/>
  <ProductModal v-bind:product="product" ref="addEditModal" />
  <RemoveModal v-bind:item="product" type="產品" ref="removeModal" />
</template>
<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { storeToRefs } from 'pinia'
import useProductStore from '@/stores/products'
  import useLoadingStore from "@/stores/loading"
  import Pagination from "@/components/PaginationBar.vue"
import ProductModal from '@/components/ProductModal.vue'
  import RemoveModal from '@/components/RemoveModal.vue'
  import{currency} from "../../util"
  const { isLoading } = storeToRefs(useLoadingStore())
  const ProductStore = useProductStore()
const products=computed(()=>ProductStore.products)
const pagination=computed(()=>ProductStore.pagination)
const product=ref({})
  const addEditModal = ref(null), removeModal = ref(null)
  onMounted(async function () {
    await ProductStore.getProducts(1, 'admin')
  })
  async function openModal (action, id = '') {
    product.value = products.value.find(product => product.id === id) || {}
switch (action) {
case 'add':
        addEditModal.value.show()
        break
      case 'modify':
        addEditModal.value.show()
        break
      case 'remove':
        removeModal.value.show()
        break
    }
  }
</script>
