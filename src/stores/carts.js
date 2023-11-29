import useLoadingStore from "@/stores/loading"
import useMessageStore from "@/stores/messages"
import useProductStore from "@/stores/products"
import { defineStore, storeToRefs } from "pinia"
import { ref } from "vue"
import { http } from "../util"
export default defineStore(
  'carts',
  () => {
    const cartItem=ref({}),cartList = ref([]), final_total = ref(0), total = ref(0)
    const { isLoading } = storeToRefs(useLoadingStore())
    const { product } = storeToRefs(useProductStore())
    const { pushMessage } = useMessageStore()
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
          cartList.value.push(response.data.data)
        } else {
          pushMessage('danger', '加入購物車失敗', `未將${product.value.title}加入購物車`)
        }
      }).finally(function () { getCarts() })
    }
    function editCart ( qty) {
        console.info(cartItem.value)
http.put(
        `/api/${import.meta.env.VITE_PATH}/cart/${cartItem.value.id}`,
        {
          data:
          {
            product_id: cartItem.value.product_id,
            qty
          }
        }
      ).then(function (response) {
        if (response.data.success) {
          pushMessage('success', response.data.message)
          cartList.value.splice(
            cartList.value.findIndex(cart=>cart===cartItem.value),
            1,
            {
                ...cartItem.value,
                product_id:response.data.data.product_id,
                qty:response.data.data.qty
            }
          )
        } else {
          response.data.message.forEach(function (msg) { pushMessage('danger', '未更新購物車', msg) })
        }
      }).finally(function () { 
        getCarts()
      })
    }
    function getCarts () {
      isLoading.value = true
      cartList.value = []
      total.value = 0
      final_total.value = 0
      http.get(`/api/${import.meta.env.VITE_PATH}/cart`)
        .then(function (response) {
          if (response.data.success) {
            cartList.value = response.data.data.carts
            total.value = response.data.data.total
            final_total.value = response.data.data.final_total
            isLoading.value = false
          }
        })
    }
    function removeCart () {
      http.delete(`/api/${import.meta.env.VITE_PATH}/cart/${cartItem.value.id}`)
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
    return { cartItem,cartList, final_total, total, addCart, editCart, getCarts, removeCart, removeCarts }
  }
)