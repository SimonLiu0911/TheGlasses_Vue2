<template>
  <Layout>
    <div :id="$style.home" class="text-center">
      <h1 class="py-5">The Glasses</h1>
      <div :class="$style['background_image']"></div>

      <div class="p-5">
        <p class="mb-1">
          Here, we focus on making timeless pieces by partnering with
          the world’s finest makers, sourcing the finest material, trace down to their
          <!-- <br> -->
          origin and sharing their story with you, so you will always
          know what you are buying, literally.
        </p>
      </div>
      <img
        :class="$style.series_number"
        class="mb-3"
        src="https://ucarecdn.com/e035224c-43cf-4912-af38-c405209a2c45/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
        alt="series number"
      />

      <section class="container my-5 px-0">
        <div class="row">
          <div class="col-md-7">
            <img
              class="w-100"
              src="https://images.unsplash.com/photo-1547104442-a40f335740cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80"
              alt
            />
          </div>
          <AboutCopyWriting
            :copywriting="copywriting[0]"
          ></AboutCopyWriting>
        </div>
        <div class="row d-flex flex-row-reverse mt-5">
          <div class="col-md-7">
            <img
              class="w-100"
              src="https://images.unsplash.com/photo-1539126190438-008b15923601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
              alt
            />
          </div>
          <AboutCopyWriting
            :copywriting="copywriting[1]"
          ></AboutCopyWriting>
        </div>
        <div class="row mt-5">
          <AboutCopyWriting
            :copywriting="copywriting[2]"
          ></AboutCopyWriting>
        </div>
      </section>

      <section :class="$style.bg_color" class="my-5 py-5">
        <form>
          <label for="subscribe" class="pr-2">Subscribe:</label>
          <input
            id="subscribe"
            :class="$style.subscribe_style"
            class="pr-2"
            type="email"
            placeholder="Enter your email"
            v-model="subscription.email"
          />
          <BaseButton
            :class="$style.subscribe_btn"
            type="button"
            @click="onSubscribe"
          >
            Confirm
          </BaseButton>
        </form>
      </section>
    </div>
  </Layout>
</template>

<script>
import * as utils from '@store/utils';

export default {
  components: {
    Layout: () => import('@layout/main'),
    AboutCopyWriting: () => import('./components/AboutCopyWriting.vue')
  },
  data() {
    return {
      copywriting: [
        {
          subtitle: 'FULL TRACEBILITY',
          title: 'Every Product Has A Code',
          content: `three numbers, divided into three sets, are debossed in white on
              each product.Each set of number corresponds to a different meaning
              that can be traced back to the origin of each product.It refers to
              style number, material provider, material type and the makers that
              make the product.`,
          style: 'm-auto col-md-5 text-left'
        },
        {
          subtitle: 'HONEST PRICING',
          title: 'Know What is Worth Paying For',
          content: `We believe that you shouldn't have to choose between quality, fairness
              and value.Transparency means we can provide real quality at a much lower
              price. We’d rather our customers know exactly how much effort goes into
              making each product and make sure our partners get full recognition for
              their devotion and skill. We won’t shave a few cents off production or
              try and squeeze an extra penny from our customers through hidden markups.`,
          style: 'm-auto col-md-5 text-left'
        },
        {
          subtitle: 'HONEST PRICING',
          title: 'Know What is Worth Paying For',
          content: `We believe that you shouldn't have to choose between quality, fairness
              and value.Transparency means we can provide real quality at a much lower
              price. We’d rather our customers know exactly how much effort goes into
              making each product and make sure our partners get full recognition for
              their devotion and skill. We won’t shave a few cents off production or
              try and squeeze an extra penny from our customers through hidden markups.`,
          style: 'col-md-8 m-auto'
        }
      ],
      subscription: {
        email: '',
        regExp: /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
      }
    };
  },
  methods: {
    onSubscribe() {
      if (this.subscription.email === '') return;
      switch (this.subscription.regExp.test(this.subscription.email)) {
        case true:
          utils.notifyAlert('訂閱成功', 'success');
          this.subscription.email = '';
          break;
        case false:
          utils.notifyAlert('請填寫正確Email', 'warning');
          this.subscription.email = '';
      }
    }
  }
};
</script>

<style lang="scss" module>
#home {
  .background_image {
    background-image: url("https://images.unsplash.com/photo-1587929373464-d5b6ddc340b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1264&q=80");
    height: 50vh;
    min-height: 350px;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center 30%;
  }
  .series_number {
  width: 70%;
  }
  .bg_color {
    background-color: rgba(0, 0, 0, 0.04);
  }
  .subscribe {
    &_style {
      border: none;
      background-color: rgba(0, 0, 0, 0);
      border-bottom: 1px solid gray;
      outline: none;
    }
    &_btn {
      border: none;
      background-color: rgba(0, 0, 0, 0);
    }
  }
}
</style>
