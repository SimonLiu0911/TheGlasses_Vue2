<template>
  <div :class="copywriting.style">
    <span :class="$style['opacity_6']" class="mb-0">{{ copywriting.subtitle }}</span>
    <h2 class="mb-4">{{ copywriting.title }}</h2>
    <p class="mb-0">
      {{ copywriting.content }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    copywriting: {
      type: Object,
      require: true,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="scss" module>
.opacity_6 {
  opacity: 0.6;
}
</style>
