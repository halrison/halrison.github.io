<template>
  <div aria-live="polite" aria-atomic="true" class="position-relative">
    <!-- Position it: -->
    <!-- - `.toast-container` for spacing between toasts -->
    <!-- - `.position-absolute`, `top-0` & `end-0` to position the toasts in the upper right corner -->
    <!-- - `.p-3` to prevent the toasts from sticking to the edge of the container  -->
    <div class="toast-container position-absolute top-0 end-0 p-3">
      <!-- Then put toasts within -->
      <ToastMessage v-for="message,index in messages" v-bind:key="index" v-bind:msg="message" />
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import useMessageStore from '@/stores/messages'
import ToastMessage from '@/components/ToastMessage.vue'

const {messages}=storeToRefs(useMessageStore())
</script>
<style scoped>
</style>