<template>
  <nav id="navBar" class="navbar navbar-expand-lg navbar-light bg-white navbar_border">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav navbar-nav__position">
          <li
            id="about"
            class="nav-item mr-2 ml-2"
          >
            <router-link class="nav-link" to="/">ABOUT</router-link>
          </li>
          <li
            id="shop"
            class="nav-item mr-2 ml-2"
          >
            <router-link class="nav-link" to="/shop">SHOP</router-link>
          </li>
          <li
            id="cart"
            class="nav-item mr-2 ml-2"
          >
            <router-link class="nav-link" to="/cart">CART</router-link>
          </li>
          <li
            id="faq"
            class="nav-item mr-2 ml-2"
          >
            <router-link class="nav-link" to="/FAQ">FAQ</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
  },
  data() {
    return {

    };
  }
};
</script>

<style lang="scss">
#navBar {
  border-bottom: 1px solid black;
}
</style>
