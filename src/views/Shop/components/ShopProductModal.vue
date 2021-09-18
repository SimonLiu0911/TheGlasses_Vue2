<script>
export default {
  props: {
    singleProduct: {
      type: Object,
      require: true
    }
  },
  methods: {
    onAddToCart(singleProduct) {
      this.$emit('onAddToCart', singleProduct);
    }
  }
};
</script>

<template>
  <div
    id="single_product_modal"
    class="modal fade"
    role="dialog"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="exampleModalLabel" class="modal-title">
            {{ singleProduct.title }}
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img :src="singleProduct.image" class="img-fluid" alt />
          <blockquote class="blockquote mt-3">
            <p class="mb-0" v-html="singleProduct.content"></p>
            <footer class="blockquote-footer text-right">
              {{ singleProduct.description }}
            </footer>
          </blockquote>
          <div class="d-flex justify-content-between align-items-baseline">
            <div v-if="!singleProduct.price" class="h4">
              {{ singleProduct.origin_price }} 元
            </div>
            <del v-if="singleProduct.price" class="h6">
              Price {{ singleProduct.origin_price | thousands }} 元
            </del>
            <div v-if="singleProduct.price" class="h4 text-danger">
              Now only need {{ singleProduct.price | thousands }} 元
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <BaseButton
            type="button"
            class="btn btn-dark btn-block rounded-0"
            @click="onAddToCart(singleProduct)"
          >
            Add to Cart
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
