<template>
  <nav
    id="navBar"
    :class="$style['navbar_style']"
    class="navbar navbar-expand-lg navbar-light bg-white"
  >
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbar" class="collapse navbar-collapse justify-content-center">
        <ul class="navbar-nav navbar-nav__position">
          <li
            v-for="(menu, index) in navbarMenus"
            :key="index"
            id="about"
            class="nav-item mr-2 ml-2"
            :class="{ 'active': currentPage === menu.alias }"
          >
            <router-link class="nav-link" :to="{ name:menu.alias }">{{ menu.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navbarMenus: [
        {
          name: 'ABOUT',
          alias: 'About'
        },
        {
          name: 'SHOP',
          alias: 'Shop'
        },
        {
          name: 'CART',
          alias: 'Cart'
        },
        {
          name: 'FAQ',
          alias: 'Faq'
        }
      ],
      currentPage: this.$route.name
    };
  },
  mounted() {
  }
};
</script>

<style lang="scss" module>
.navbar_style {
  border-bottom: 1px solid black;
}
</style>
