<script>
export default {
  components: {
    Layout: () => import('@layout/main'),
    General: () => import('./components/General.vue'),
    Discountcode: () => import('./components/Discountcode.vue')
  },
  data() {
    return {
      view: 'general'
    };
  },
  methods: {
    changeView(viewName) {
      this.view = viewName;
    }
  }
};
</script>

<template>
  <Layout>
    <section :id="$style.faq">
      <div :class="$style.needHelp" class="mb-3 text-center">
        <p class="h1">Need Help?</p>
        <p class="mb-0 pt-4">
          <a href="mailto:milkjhang@hotmail.com" :class="$style.email_link">milkjhang@hotmail.com</a>
        </p>
        <p>We're here to help. Contact us anytime.</p>
      </div>
      <ul class="nav justify-content-center mb-3">
        <li class="nav-item">
          <a
          :class="{'active': view === 'general'}"
          class="nav-link text-dark faq_link"
          href="javascript:;"
          @click.prevent="changeView('general')"
          >
            GENERAL
          </a>
        </li>
        <li class="nav-item">
          <a
          :class="{'active': view === 'discountcode'}"
          class="nav-link text-dark faq_link"
          href="javascript:;"
          @click.prevent="changeView('discountcode')"
          >
            DISCOUNT CODE
          </a>
        </li>
      </ul>
      <component :is="view"></component>
    </section>
  </Layout>
</template>

<style lang="scss" module>
#faq {
  .needHelp {
    background-color: rgba(0, 0, 0, 0.04);
    width: 100%;
    padding: 40px 0;
  }
  .email_link {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.4);
    &:hover {
      color: rgba(0, 0, 0, 0.8);
      text-decoration: none;
    }
  }
}
:global {
  .faq_link {
    &.active {
      border-bottom: 1px solid #000000;
    }
    &:hover {
      border-bottom: 1px solid #000000;
    }
  }
}
</style>
