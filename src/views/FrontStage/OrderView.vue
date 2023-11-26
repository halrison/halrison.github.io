<template>
  <loading v-bind:is-full-page="true" v-bind:active="isLoading" />
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>訂單編號</th>
          <th>建立日期</th>
          <th>付款金額</th>
          <th>付款日期</th>
          <th>動作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="o in orders" v-bind:key="o.num">
          <td v-text="o.id"></td>
          <td v-text="new Date(o.create_at*1000).toLocaleDateString()"></td>
          <td v-text="currency(o.total)"></td>
          <td>{{o.paid_date?new Date(o.paid_date*1000).toLocaleDateString():'尚未付款'}}</td>
          <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
              <button class="btn btn-outline-primary" v-on:click="openModal('view',o.id)">檢視</button>
              <button class="btn btn-outline-info" v-on:click="openModal('pay',o.id)" v-show="!o.paid_date">付款</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination v-bind:pagination="pagination" v-show="pagination.total_pages>1" v-on:paginate="page=>getOrders(page,'user')" />
    <OrderModal v-bind:id="order.id" type="user" ref="viewModal" />
    <PayModal v-bind:order="order" ref="payModal" />
  </div>
</template>
<script setup>
  import useLoadingStore from "@/stores/loading"
  import useOrderStore from "@/stores/orders"
  import { storeToRefs } from "pinia"
  import { onMounted, ref } from "vue"
  import { currency } from "../../util"
  import OrderModal from "@/components/OrderModal.vue"
  import PayModal from "@/components/PayModal.vue"
  import Pagination from "@/components/PaginationBar.vue"
const viewModal = ref(null), payModal = ref(null)
  const { isLoading } = storeToRefs(useLoadingStore())
  const orderStore = useOrderStore(), { getOrders } = orderStore, { orders, pagination } = storeToRefs(orderStore), order = ref({})
onMounted(function () {
    getOrders(1, 'user')
  })
  function openModal (action, id) {
    order.value = orders.value.find(o => o.id === id)
    if (action === 'view') {
      viewModal.value.show()
    } else {
      payModal.value.show()
    }
  }
</script>
<style scoped>
</style>