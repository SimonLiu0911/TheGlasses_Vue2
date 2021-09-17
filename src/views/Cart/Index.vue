
<script>
export default {
  components: {
    Layout: () => import('@layout/main')
  },
  data() {
    return {
      cart: [
        {
          product: {
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
          quantity: 1,
          created: {
            diff: '12秒前',
            datetime: '2021-09-17 17:04:56',
            timestamp: 1631869496
          },
          updated: {
            diff: '12秒前',
            datetime: '2021-09-17 17:04:56',
            timestamp: 1631869496
          }
        }
      ],
      cartTotal: 0,
      shoppingBagItems: true
    };
  },
  methods: {
    onGoingCheckout() {
      console.log('onGoingCheckout');
    },
    onRemoveAllCartItem() {
      console.log('onRemoveAllCartItem');
    },
    onUpdateQuantity() {
      console.log('onUpdateQuantity');
    },
    onrRemoveCartItem() {
      console.log('onrRemoveCartItem');
    }
  }
};
</script>

<template>
  <Layout>
    <div class="cart">
      <div class="row justify-content-center my-2">
        <template v-if="shoppingBagItems">
          <div class="col-md-9">
            <div class="text-right mb-3">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm rounded-0"
                @click="onRemoveAllCartItem()"
              >
                Delete All
              </button>
            </div>
            <table class="table text-center">
              <thead>
                <th>Commodity</th>
                <th width="150px">Qty</th>
                <th>Price for Each</th>
                <th>Unit</th>
                <th>Delete</th>
              </thead>
              <tbody v-if="cart.length">
                <tr v-for="item in cart" :key="item.id">
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td class="align-middle">
                    <div class="input-group bg-light">
                      <div class="input-group-append">
                        <button
                          class="btn btn-outline-dark"
                          type="button"
                          @click="
                            onUpdateQuantity(item.product.id, item.quantity - 1)
                          "
                          :disabled="item.quantity === 1"
                        >
                          -
                        </button>
                      </div>
                      <input
                        type="text"
                        class="form-control text-center"
                        :value="item.quantity"
                        @keyup.enter="
                          onUpdateQuantity(item.product.id, $event.target.value)
                        "
                        disabled
                      />
                      <div class="input-group-prepend">
                        <button
                          class="btn btn-outline-dark"
                          type="button"
                          @click="
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          "
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </td>
                  <td class="align-middle">
                    {{ item.product.price | thousands }}
                  </td>
                  <td class="align-middle">{{ item.product.unit }}</td>
                  <td class="align-middle">
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm rounded-0"
                      @click="onrRemoveCartItem(item.product.id)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div id="totalcart">
              <div class="totalcart__table">
                <table class="border-bottom">
                  <tbody>
                    <tr>
                      <th width="150px">Subtotal</th>
                      <td>
                        <span>{{ cartTotal | thousands }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  type="button"
                  class="btn btn-dark btn-block rounded-0 mt-2"
                  @click="onGoingCheckout"
                >
                  CHECKOUT
                </button>
              </div>
            </div>
            <span class="clearBoth"></span>
          </div>
        </template>
        <template v-else>
          <div class="emptyShoppingBag mt-5">
            <p class="h2">Shopping Bag</p>
            <p>You have nothing in your bag.</p>
          </div>
        </template>
      </div>
      <!-- Vue Loading -->
      <!-- <loading :active.sync="this.$store.state.isLoading"></loading> -->
    </div>
  </Layout>
</template>
