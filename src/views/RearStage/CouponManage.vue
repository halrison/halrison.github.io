<template>
  <loading v-bind:is-full-page="true" v-bind:active="isLoading" />
  <button type="button" class="btn btn-primary float-end" v-on:click="openModal('add')">新增優惠券</button>
  <table class="table">
    <thead>
      <tr>
        <th>標題</th>
        <th>代碼</th>
        <th>折扣</th>
        <th>到期日</th>
        <th>啟用</th>
        <th>動作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="coupon in coupons" v-bind:key="coupon.id">
        <td v-text="coupon.title"></td>
        <td v-text="coupon.code"></td>
        <td v-text="coupon.percent"></td>
        <td v-text="new Date(coupon.due_date).toLocaleDateString()"></td>
        <td>{{coupon.is_enabled?'已':'未'}}啟用</td>
        <td>
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-primary" v-on:click="openModal('modify',coupon.id)">編輯</button>
            <button class="btn btn-outline-danger" v-on:click="openModal('remove',coupon.id)">移除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination v-bind:pagination="pagination" v-show="pagination.total_pages>1"
  v-on:paginate="page=>CouponStore.getCoupon(page,'admin')"/>
  <CouponModal ref="addEditModal" v-bind:coupon="coupon"/>
  <RemoveModal ref="removeModal" v-bind:item="coupon" type="優惠券" />
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
  import { storeToRefs } from "pinia";
import useCouponStore from "@/stores/coupons"
import useLoadingStore from "@/stores/loading"
  import Pagination from "@/components/PaginationBar.vue"
import CouponModal from "@/components/CouponModal.vue"
import RemoveModal from "@/components/RemoveModal.vue"
const CouponStore=useCouponStore()
const { isLoading } = storeToRefs(useLoadingStore())
const coupon=ref({})
const addEditModal=ref(null)
const removeModal=ref(null)
const coupons=computed(()=>CouponStore.coupons)
const pagination=computed(()=>CouponStore.pagination)
  onMounted(async function () {
  await CouponStore.getCoupons(1)
})
function openModal(action,id=''){
  coupon.value = {}
switch (action) {
    case 'add':
      coupon.value = { due_date: new Date().toISOString().split('T')[0] }
      addEditModal.value.show()
      break
    case 'modify':
      coupon.value=coupons.value.find(coupon => coupon.id === id)
      coupon.value.due_date = new Date(coupon.value.due_date).toISOString().split('T')[0] 
addEditModal.value.show()
      break
    case 'remove':
      coupon.value =coupons.value.find(coupon => coupon.id === id)
removeModal.value.show()
  }
}
</script>
<style scoped>
</style>