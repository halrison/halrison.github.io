<template>
  <div class="card ">
    <img v-bind:src="product.imageUrl" class="card-img-top" v-bind:alt="product.title">
    <slot name="header"></slot>
    <slot name="body"></slot>
    <slot name="footer"></slot>
  </div>
</template>
<script setup>
import { ref } from "vue"
const prop=defineProps(['product'])
const product = ref(prop.product)
</script>