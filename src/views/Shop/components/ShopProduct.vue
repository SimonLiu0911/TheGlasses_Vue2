<script>
import * as utils from '@/store/utils';

export default {
  components: {
    ShopProductModal: () => import('./ShopProductModal.vue')
  },
  props: {
    // card裡面的商品資訊
    product: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      // Modal裡面的商品資訊
      singleProduct: {}
    };
  },
  methods: {
    onGetProductDetail(id) {
      const config = {
        method: 'GET',
        url: `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`
      };
      utils.vueAjaxSubmit.ajaxSubmit(config, response => {
        this.singleProduct = response.data;
      });
    },
    onAddToCart() {
      console.log('onAddToCart');
    }
  }
};
</script>

<template>
  <div :id="$style['shop-card']" class="card bg-white h-100">
    <img :src="product.imageUrl" :class="$style.commidity_img" class="card-img-top" :alt="product.title" />
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <p class="card-text">{{ product.content }}</p>
      <div class="d-flex justify-content-between align-products-baseline">
        <div class="h5" v-if="!product.price">{{ product.origin_price | thousands }} 元</div>
        <div v-else>
          <del class="h6">Price: {{ product.origin_price | thousands }} {{ product.unit }}</del>
          <div
            class="h5 text-danger"
          >Now just only {{ product.price | thousands }} {{ product.unit }}</div>
        </div>
      </div>
    </div>
    <div class="card-footer d-flex border-0 bg-white">
      <BaseButton
        type="button"
        class="btn btn-outline-secondary btn-sm rounded-0"
        data-toggle="modal"
        data-target="#single_product_modal"
        @click="onGetProductDetail(product.id)"
      >
        Detail
      </BaseButton>
      <BaseButton
        type="button"
        class="btn btn-outline-danger btn-sm ml-auto rounded-0"
        @click="onAddToCart(product)"
      >
        Add to Cart
      </BaseButton>
    </div>
    <!-- Detail Modal -->
    <ShopProductModal :single-product="singleProduct"></ShopProductModal>
  </div>
</template>

<style lang="scss" module>
#shop-card {
  .commidity_img {
    height: 300px;
    max-height: 250px;
    object-fit: cover;
  }
}
</style>
