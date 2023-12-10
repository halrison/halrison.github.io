<template>
  <Swiper ref="{swiperRef}" 
      v-bind:slidesPerView="3"
      v-bind:spaceBetween="10"
      v-bind:autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      v-bind:navigation="true"
      v-bind:modules="modules">
    <swiper-slide class="col-4" v-for="product,index in prop.products" v-bind:key="index">
      <ProductCard v-bind:product="product">
        <template v-slot:header>
          <div class="card-header">
            <h5 class="card-title" v-text="product.title"></h5>
          </div>
        </template>
        <template v-slot:body>
          <div class="card-body">
            <span class="card-text float-start">台幣{{product.price}}元</span>
            <span class="card-text float-end">
              <small class="text-muted">剩餘{{product.num}}{{product.unit}}</small>
            </span>
          </div>
        </template>
      </ProductCard>
    </swiper-slide>
  </Swiper>
</template>
<script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Autoplay, Navigation } from 'swiper/modules'
  import { onMounted } from 'vue'
  import useProductStore from "@/stores/products"
  import ProductCard from "@/components/ProductCard.vue"
import 'swiper/css'
  import 'swiper/css/navigation'
  import 'swiper/css/autoplay'
  const modules = [Autoplay, Navigation]
  const prop=defineProps(['products'])
</script>