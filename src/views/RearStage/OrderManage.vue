<template>
  <loading v-bind:is-full-page="true" v-bind:active="isLoading" />
    <button class="btn btn-danger float-end" v-on:click="openModal('clear')">刪除所有訂單</button>
    <table class="table">
      <thead>
        <tr>
          <th>訂單編號</th>
          <th>建立日期</th>
          <th>付款日期</th>
          <th class="text-end">付款金額</th>
          <th class="text-center">動作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" v-bind:key="order.num">
          <td v-text="order.id"></td>
          <td v-text="new Date(order.create_at*1000).toLocaleDateString()"></td>
          <td>{{ order.paid_date ? new Date(order.paid_date*1000).toLocaleDateString() : '尚未付款' }}</td>
          <td class="text-end" v-text="order.total"></td>
          <td class="text-end">
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
              <button class="btn btn-outline-primary" v-on:click="openModal('edit',order.id)">編輯</button>
              <button class="btn btn-outline-danger" v-on:click="openModal('remove',order.id)">移除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination v-bind:pagination="pagination" v-show="pagination.total_pages>1" v-on:paginate="page=>getOrders(page,'admin')"/>
    <OrderModal v-bind:order="order" type="admin" ref="editModal" />
    <RemoveModal v-bind:item="order" v-bind:type="type" ref="removeModal" />
</template>
<script setup>
  import { storeToRefs } from "pinia"
  import { onMounted, ref } from "vue"
  import OrderModal from "@/components/OrderModal.vue"
  import RemoveModal from "@/components/RemoveModal.vue"
  import Pagination from "@/components/PaginationBar.vue"
  import useLoadingStore from "@/stores/loading"
  import useOrderStore from "@/stores/orders"
  const editModal = ref(null), removeModal = ref(null),type=ref('')
  const { isLoading } = storeToRefs(useLoadingStore())
  const orderStore = useOrderStore(), { getOrders } = orderStore, { orders, pagination } = storeToRefs(orderStore), order = ref({})
  onMounted(function () {
    getOrders(1, 'admin')
  })
  function openModal (action, id='') {
    order.value = orders.value.find(o => o.id === id)||{}
    if (action === 'edit') {
      editModal.value.show()
    } else if(action==='remove'){
      type.value='單一訂單'
      removeModal.value.show()
    }else {
      type.value = '所有訂單'
      removeModal.value.show()
    }
  }
</script>