<script>
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
      singleProduct: {
        id: '1',
        title: 'Glasses Copper',
        category: 'Glasses',
        content: 'copper ingredient: 99.9%',
        description: 'The Glasses is made of copper.',
        imageUrl: [
          'https://images.unsplash.com/photo-1591643529995-aef2e1e6f281?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60'
        ],
        enabled: true,
        origin_price: 2000,
        price: 999,
        unit: 'NT',
        created: {
          diff: '1年前',
          datetime: '2020-09-01 17:35:48',
          timestamp: 1598952948
        },
        updated: {
          diff: '1年前',
          datetime: '2020-09-01 17:35:48',
          timestamp: 1598952948
        }
      }
    };
  },
  methods: {
    onGetDetailed() {
      console.log('onGetDetailed');
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
        @click="onGetDetailed(product)"
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
