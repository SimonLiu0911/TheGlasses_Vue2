<script>
export default {
  components: {
    Layout: () => import('@layout/main'),
    ShopProduct: () => import('./components/ShopProduct.vue')
  },
  data() {
    return {
      // fake data
      // products: [],
      products: [
        {
          id: '1',
          title: 'Glasses Copper',
          category: 'Glasses',
          content: 'copper ingredient: 99.9%',
          imageUrl: [
            'https://images.unsplash.com/photo-1591643529995-aef2e1e6f281?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60'
          ],
          enabled: true,
          origin_price: 2000,
          price: 999,
          unit: 'NT'
        },
        {
          id: '2',
          title: 'Glasses Silver',
          category: 'Glasses',
          content: 'Silver ingredient: 80%',
          imageUrl: [
            'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60'
          ],
          enabled: true,
          origin_price: 2500,
          price: 1899,
          unit: 'NT'
        },
        {
          id: '3',
          title: 'Glasses Gold',
          category: 'Glasses',
          content: 'gold ingredient: 99.9%',
          imageUrl: [
            'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80'
          ],
          enabled: true,
          origin_price: 3000,
          price: 1999,
          unit: 'NT'
        },
        {
          id: '4',
          title: 'Glasses Gold',
          category: 'Glasses',
          content: 'gold ingredient: 99.9%',
          imageUrl: [
            'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80'
          ],
          enabled: true,
          origin_price: 3000,
          price: 1999,
          unit: 'NT'
        }
      ],
      // fake data
      pagination: {
        total: 3,
        count: 3,
        per_page: 25,
        current_page: 1,
        total_pages: 1
      }
    };
  },
  methods: {
    getFrontProducts(page = 1) {
      console.log('trigger getFrontProducts');
    }
  },
  computed: {
    getProduct() {
      if (this.products.length > 0) return true;
      return false;
    }
  }
};
</script>

<template>
  <Layout>
    <section id="shop">
      <div class="container my-2">
        <div class="row">
          <template v-if="getProduct">
            <div class="col-md-4 col-sm-6 mb-4" v-for="product in products" :key="product.id">
              <ShopProduct :product="product"></ShopProduct>
                <!-- <div class="card bg-white h-100">
                  <img :src="item.imageUrl" :class="$style.commidity_img" class="card-img-top" :alt="item.title" />
                  <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <p class="card-text">{{ item.content }}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                      <div class="h5" v-if="!item.price">{{ item.origin_price | thousands }} 元</div>
                      <div v-else>
                        <del class="h6">Price: {{ item.origin_price | thousands }} {{ item.unit }}</del>
                        <div
                          class="h5 text-danger"
                        >Now just only {{ item.price | thousands }} {{ item.unit }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer d-flex border-0 bg-white">
                    <button
                      type="button"
                      class="btn btn-outline-secondary btn-sm rounded-0"
                      @click="onGetDetailed(item)"
                    >Detail</button>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm ml-auto rounded-0"
                      @click="onAddToCart(item)"
                    >Add to Cart</button>
                  </div>
                </div> -->
            </div>
          </template>
          <template v-else>
            <h2 class="m-auto p-5">
              暫無商品
            </h2>
          </template>
        </div>
      </div>
    </section>
    <template v-if="getProduct">
      <BasePagination :pages="pagination" @update="getFrontProducts"></BasePagination>
    </template>
  </Layout>
</template>
