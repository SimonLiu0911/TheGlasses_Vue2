<script>
export default {
  components: {
    Layout: () => import('@layout/main')
  }
};
</script>

<template>
  <Layout>
    <section id="404">
      <p class="h1 text-center my-5">
        頁面載入時間過長，請確認網路連線狀況
      </p>
    </section>
  </Layout>
</template>
