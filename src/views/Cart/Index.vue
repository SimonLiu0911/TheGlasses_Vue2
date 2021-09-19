
<script>
import * as utils from '@/store/utils';

export default {
  components: {
    Layout: () => import('@layout/main')
  },
  data() {
    return {
      shoppingCart: [],
      totalPrice: 0,
      havingShoppingBagItems: true,
      isLoading: false
    };
  },
  methods: {
    // 取得購物車列表
    getShoppingCart() {
      this.isLoading = true;
      const config = {
        method: 'GET',
        url: `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`
      };
      utils.vueAjaxSubmit.ajaxSubmit(config, response => {
        this.shoppingCart = response.data;
        this.totalPrice = 0;
        this.shoppingCart.forEach(item => {
          this.totalPrice += item.product.price * item.quantity;
        });
        if (this.shoppingCart.length === 0) {
          this.havingShoppingBagItems = false;
        }
        this.isLoading = false;
      });
    },
    onGoingCheckout() {
      console.log('onGoingCheckout');
    },
    // 刪除購物車全部資料
    onDeleteAllCartItem() {
      const config = {
        method: 'DELETE',
        url: `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/all/product`
      };
      utils.vueAjaxSubmit.ajaxSubmit(config, response => {
        utils.notifyAlert(response.message, 'warning');
        this.getShoppingCart();
      });
    },
    onUpdateQuantity(id, num) {
      const config = {
        method: 'PATCH',
        url: `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`,
        params: {
          product: id,
          quantity: num
        }
      };
      utils.vueAjaxSubmit.ajaxSubmit(config, response => {
        this.getShoppingCart();
      });
    },
    // 刪除某一筆購物車資料
    onDeleteCartItem(id) {
      const config = {
        method: 'DELETE',
        url: `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`
      };
      utils.vueAjaxSubmit.ajaxSubmit(config, response => {
        utils.notifyAlert(response.message, 'warning');
        this.getShoppingCart();
      });
    }
  },
  mounted() {
    this.getShoppingCart();
  }
};
</script>

<template>
  <Layout>
    <div :id="$style.cart">
      <div class="row justify-content-center my-4">
        <template v-if="havingShoppingBagItems">
          <div class="col-md-9">
            <div class="text-right mb-3">
              <BaseButton
                type="button"
                class="btn btn-outline-danger btn-sm rounded-0"
                @click="onDeleteAllCartItem()"
              >
                Delete All
              </BaseButton>
            </div>
            <table class="table text-center">
              <thead>
                <th>Commodity</th>
                <th width="150px">Qty</th>
                <th>Price for Each</th>
                <th>Unit</th>
                <th>Delete</th>
              </thead>
              <tbody v-if="shoppingCart.length">
                <tr v-for="item in shoppingCart" :key="item.id">
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td class="align-middle">
                    <div class="input-group bg-light">
                      <div class="input-group-append">
                        <BaseButton
                          class="btn btn-outline-dark"
                          type="button"
                          @click="onUpdateQuantity(item.product.id, item.quantity - 1)"
                          :disabled="item.quantity === 1"
                        >
                          -
                        </BaseButton>
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
                        <BaseButton
                          class="btn btn-outline-dark"
                          type="button"
                          @click="onUpdateQuantity(item.product.id, item.quantity + 1)"
                        >
                          +
                        </BaseButton>
                      </div>
                    </div>
                  </td>
                  <td class="align-middle">
                    {{ item.product.price | thousands }}
                  </td>
                  <td class="align-middle">{{ item.product.unit }}</td>
                  <td class="align-middle">
                    <BaseButton
                      type="button"
                      class="btn btn-outline-danger btn-sm rounded-0"
                      @click="onDeleteCartItem(item.product.id)"
                    >
                      Delete
                    </BaseButton>
                  </td>
                </tr>
              </tbody>
            </table>
            <div :class="$style.totalcart" class="float-right">
              <div :class="$style.totalcart_table">
                <table class="border-bottom">
                  <tbody>
                    <tr>
                      <th width="150px">Subtotal</th>
                      <td>
                        <span>{{ totalPrice | thousands }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <BaseButton
                  type="button"
                  class="btn btn-dark btn-block rounded-0 mt-2"
                  @click="onGoingCheckout"
                  :to="{ name: 'Checkout' }"
                >
                  CHECKOUT
                </BaseButton>
              </div>
            </div>
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
      <Loading :active.sync="this.isLoading"></Loading>
    </div>
  </Layout>
</template>

<style lang="scss" module>
#cart {
  .totalcart {
    &_table {
      font-size: 1.875rem;
    }
  }
}
</style>
