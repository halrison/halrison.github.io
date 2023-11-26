import useLoadingStore from "@/stores/loading"
import useMessageStore from "@/stores/messages"
import useProductStore from "@/stores/products"
import { defineStore, storeToRefs } from "pinia"
import { ref } from "vue"
import { http } from "../util"
export default defineStore(
  'carts',
  () => {
    const carts = ref([]), final_total = ref(0), total = ref(0), { isLoading } = storeToRefs(useLoadingStore()), { product } = storeToRefs(useProductStore()), { pushMessage } = useMessageStore()
    function addCart (quantity) {
      http.post(
        `/api/${import.meta.env.VITE_PATH}/cart`,
        {
          data: {
            product_id: product.value.id,
            qty: quantity
          }
        }
      ).then(function (response) {
        if (response.data.success) {
          pushMessage('success', '加入購物車成功', `已將${product.value.title}加入購物車`)
          carts.value.push(response.data.data)
        } else {
          pushMessage('danger', '加入購物車失敗', `未將${product.value.title}加入購物車`)
        }
      }).finally(function () { getCarts() })
    }
    function editCart (cart, product, qty) {
      http.put(
        `/api/${import.meta.env.VITE_PATH}/cart/${cart}`,
        {
          data:
          {
            product_id: product,
            qty
          }
        }
      ).then(function (response) {
        if (response.data.success) {
          pushMessage('success', response.data.message)
        } else {
          response.data.message.forEach(function (msg) { pushMessage('danger', '未更新購物車', msg) })
        }
      }).finally(function () { getCarts() })
    }
    function getCarts () {
      isLoading.value = true
      carts.value = []
      total.value = 0
      final_total.value = 0
      http.get(`/api/${import.meta.env.VITE_PATH}/cart?timestamp=${Date.now()}`)
        .then(function (response) {
          if (response.data.success) {
            carts.value = response.data.data.carts
            total.value = response.data.data.total
            final_total.value = response.data.data.final_total
            isLoading.value = false
          }
        })
    }
    function removeCart (id) {
      http.delete(`/api/${import.meta.env.VITE_PATH}/cart/${id}`)
        .then(function (response) {
          if (response.data.success) { pushMessage('success', response.data.message) }
          else { pushMessage('success', response.data.message) }
        }).finally(function () { getCarts() })
    }
    function removeCarts () {
      http.delete(`/api/${import.meta.env.VITE_PATH}/carts`)
        .then(function (response) {
          if (response.data.success) {
            pushMessage('success', response.data.message)
          } else {
            response.data.message.forEach(function (msg) { pushMessage('danger', msg) })
          }
        }).finally(function () { getCarts() })
    }
    return { carts, final_total, total, addCart, editCart, getCarts, removeCart, removeCarts }
  }
)