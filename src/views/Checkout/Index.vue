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
      totalPriceAfterCoupon: 0,
      saveMoney: 0,
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        coupon: '',
        message: ''
      },
      paymentList: [
        {
          text: 'WebATM',
          alias: 'WebATM'
        },
        {
          text: 'ATM',
          alias: 'ATM'
        },
        {
          text: 'CreditCart',
          alias: 'CreditCart'
        },
        {
          text: 'ApplePay',
          alias: 'ApplePay'
        }
      ],
      applyCoupon: false,
      couponEnabled: '',
      priceAfterCoupon: '',
      completed: false,
      isLoading: false
    };
  },
  methods: {
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
          utils.notifyAlert('Please go back to SHOP page and choose at least one commodity!', 'danger');
        }
        this.isLoading = false;
      });
    },
    createOrder() {
      const config = {
        method: 'POST',
        url: `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`,
        params: {
          ...this.form
        }
      };
      utils.vueAjaxSubmit.ajaxSubmit(config, response => {
        this.isLoading = false;
        this.completed = true;
        utils.notifyAlert('Success to order', 'success');
      });
      this.isLoading = true;
    },
    async onSearchCoupon() {
      this.isLoading = true;
      if (this.form.coupon) {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/coupon/search`;
        this.$http.post(url, { code: this.form.coupon }).then((response) => {
          this.couponEnabled = response.data.data.enabled;
          if (this.couponEnabled) {
            this.totalPriceafterCoupon = Math.ceil(this.totalPrice * (response.data.data.percent / 100));
            this.saveMoney = this.totalPrice - this.totalPriceafterCoupon;
            this.applyCoupon = true;
            this.isLoading = false;
          } else {
            utils.notifyAlert('Can not Use Coupon Code.', 'danger');
            this.form.coupon = '';
            this.applyCoupon = false;
            this.isLoading = false;
          }
        })
          .catch(() => {
            utils.notifyAlert('This coupon is not exist!', 'danger');
            this.form.coupon = '';
            this.applyCoupon = false;
            this.isLoading = false;
          });
      } else {
        utils.notifyAlert('Need Coupon Code!!', 'warning');
        this.form.coupon = '';
        this.applyCoupon = false;
        this.isLoading = false;
      }
    }
  },
  computed: {
  },
  created() {
    this.getShoppingCart();
  }
};
</script>

<template>
  <Layout>
    <section :id="$style.checkout">
      <div class="container">
        <div :class="$style.order_completed" class="text-center" v-if="completed">The Order is Completed!</div>
        <div class="row" v-else>
          <div class="col-md-6 p-5 text-left">
            <h3 class="text-center border-bottom mb-4 pb-3">
              Contact Information
            </h3>
            <validation-observer v-slot="{ invalid }">
              <form @submit.prevent="createOrder">
                <div class="form-group">
                  <validation-provider
                    rules="required"
                    v-slot="{ errors, classes }"
                  >
                    <label for="username">
                      Name
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      id="username"
                      class="form-control rounded-0"
                      type="text"
                      v-model="form.name"
                      :class="[$style.input_style, classes]"
                      name="UserName"
                      placeholder="User Name"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="form-group">
                  <validation-provider
                    rules="email|required"
                    v-slot="{ errors, classes }"
                  >
                    <label for="email">
                      Email
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      id="email"
                      class="form-control rounded-0"
                      placeholder="Email Address"
                      type="email"
                      v-model="form.email"
                      name="Email"
                      :class="[$style.input_style, classes]"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="form-group">
                  <validation-provider
                    rules="min:10|max:10|required"
                    v-slot="{ errors, classes }"
                  >
                    <label for="tel">
                      Phone Number
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      id="tel"
                      class="form-control rounded-0"
                      :class="[$style.input_style, classes]"
                      type="phone"
                      v-model="form.tel"
                      name="PhoneNumber"
                      placeholder="Phone Number"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="form-group">
                  <validation-provider
                    rules="required"
                    v-slot="{ errors, classes }"
                  >
                    <label for="address">
                      Address
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      id="address"
                      class="form-control rounded-0"
                      :class="[$style.input_style, classes]"
                      type="text"
                      name="Address"
                      v-model="form.address"
                      placeholder="Address"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="form-group">
                  <label for="payment">
                    Payment
                    <span class="text-danger">*</span>
                  </label>
                  <select
                    id="payment"
                    class="form-control"
                    :class="$style.input_style"
                    v-model="form.payment"
                    name="Payment"
                  >
                    <option value="" selected disabled>Select</option>
                    <option
                      v-for="(payment, index) in paymentList"
                      :key="index"
                      :value="payment.alias"
                    >
                      {{ payment.text }}
                    </option>
                  </select>
                  <!-- <BaseSelect2 id="payment" class="form-control" :options="paymentList" :value="form.payment">
                    <option value="" selected disabled>Select</option>
                  </BaseSelect2> -->
                </div>
                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea
                    id="message"
                    class="form-control rounded-0"
                    :class="[$style.input_style, $style.textarea_style]"
                    cols="30"
                    rows="3"
                  ></textarea>
                </div>
                <div>
                  <BaseButton
                    type="submit"
                    class="btn btn-dark btn-block rounded-0 my-2"
                    :disabled="invalid || form.payment === '' || shoppingCart.length === 0"
                  >
                    CHECK
                  </BaseButton>
                  <BaseButton
                    :class="$style.return_to_cart_color"
                    :to="{ name: 'Cart' }"
                  >
                    <i class="fas fa-chevron-left"></i>
                    Return to Cart
                  </BaseButton>
                </div>
              </form>
            </validation-observer>
          </div>
          <div :class="$style.right_col_bg_color" class="col-md-6 p-5">
            <table class="table border-bottom mb-0 text-center">
              <thead>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
              </thead>
              <tbody>
                <tr v-for="item in shoppingCart" :key="item.id">
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td class="align-middle">{{ item.quantity }}</td>
                  <td class="align-middle">
                    {{ item.product.price | thousands }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="input-group py-3 border-bottom">
              <input
                type="text"
                class="form-control rounded-0"
                :class="$style.input_style"
                v-model="form.coupon"
                placeholder="Discount Code"
              />
              <BaseButton
                type="button"
                class="btn btn-dark rounded-0"
                @click="onSearchCoupon"
              >
                APPLY
              </BaseButton>
            </div>
            <div id="totalcart" class="my-3 float-right">
              <div :class="$style.totalcart_table">
                <table :class="$style.border_bottom">
                  <tbody>
                    <tr>
                      <th width="150px">Subtotal</th>
                      <td>
                        <span v-if="applyCoupon === false">
                          {{ totalPrice | thousands }} <em>NT</em>
                        </span>
                        <span class="text-danger" v-else>
                          {{ totalPriceafterCoupon | thousands }} <em>NT</em>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <small class="text-danger" v-if="applyCoupon === true">
                  <em> saved {{ saveMoney }} NT </em>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Vue Loading -->
      <Loading :active.sync="this.isLoading"></Loading>
    </section>
  </Layout>
</template>

<style lang="scss" module>
#checkout {
  .order_completed{
    font-size: 36px;
    padding: 60px;
    margin: 60px 0;
  }
  .input_style:focus {
    border-style: solid;
    border-color: gray;
    box-shadow: 0 0 3px gray;
  }
  .textarea_style {
    resize: none;
  }
  .return_to_cart_color {
    color: #545454;
  }
  .return_to_cart_color:hover {
    text-decoration: none;
    color: black;
  }
  .totalcart_table {
    font-size: 1.875rem;
    .border_bottom {
      border-bottom: 1px solid black !important;
    }
  }
  .right_col_bg_color {
    background-color: rgba(0, 0, 0, 0.03) !important;
  }
}
</style>
