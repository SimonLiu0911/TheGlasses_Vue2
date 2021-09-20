<script>
import * as utils from '@/store/utils';

export default {
  components: {
    Layout: () => import('@layout/main'),
    // ShopProduct: () => import('./components/ShopProduct.vue')
    ShopProductModal: () => import('./components/ShopProductModal.vue')
  },
  data() {
    return {
      products: [],
      pagination: {},
      singleProduct: {},
      noProduct: false,
      isLoading: false
    };
  },
  methods: {
    getFrontProducts(page = 1) {
      this.isLoading = true;
      const config = {
        method: 'GET',
        url: `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`,
        params: {
          page: page
        }
      };
      utils.vueAjaxSubmit.ajaxSubmit(config, response => {
        this.products = response.data;
        this.pagination = response.meta.pagination;
        if (this.products.length === 0) {
          this.noProduct = true;
        }
        this.isLoading = false;
      });
    },
    // 取得單一商品細節
    onGetDetailProduct(id) {
      const config = {
        method: 'GET',
        url: `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`
      };
      utils.vueAjaxSubmit.ajaxSubmit(config, response => {
        this.singleProduct = response.data;
        window.$('#single_product_modal').modal('show');
      });
    },
    // 新增某一筆購物車資料
    onAddToCart(product, quantity = 1) {
      const config = {
        method: 'POST',
        url: `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`,
        params: {
          product: product.id,
          quantity
        }
      };
      utils.vueAjaxSubmit.ajaxSubmit(config, response => {
        utils.notifyAlert(`已成功將 ${product.title} 放入購物車內`, 'success');
        window.$('#single_product_modal').modal('hide');
      });
    }
  },
  computed: {
    haveProduct() {
      if (this.products.length > 0) return true;
      return false;
    }
  },
  mounted() {
    this.getFrontProducts();
  }
};
</script>

<template>
  <Layout>
    <section id="shop">
      <div class="container my-2">
        <div class="row">
          <template v-if="haveProduct">
            <div class="col-md-4 col-sm-6 mb-4" v-for="product in products" :key="product.id">
                <div :id="$style['shop-card']" class="card bg-white h-100">
                  <img :src="product.imageUrl" :class="$style.commidity_img" class="card-img-top" :alt="product.title" />
                  <div class="card-body">
                    <h5 class="card-title">{{ product.title }}</h5>
                    <p class="card-text">{{ product.content }}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
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
                    @click="onGetDetailProduct(product.id)"
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
                </div>
            </div>
          </template>
          <template v-else-if="noProduct">
            <h2 class="m-auto p-5">
              No Commodity
            </h2>
          </template>
          <template v-else>
            <h2 class="m-auto p-5">
              Commodity is loading...
            </h2>
          </template>
        </div>
      </div>
    </section>
    <template v-if="haveProduct">
      <BasePagination :pages="pagination" @update="getFrontProducts"></BasePagination>
    </template>

    <!-- Single Product Modal -->
    <ShopProductModal
      :single-product="singleProduct"
      @onAddToCart="onAddToCart"
    ></ShopProductModal>

    <!-- Vue Loading -->
    <Loading :active.sync="this.isLoading"></Loading>
  </Layout>
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
