<template>
  <span class="webviewWrapper">
    <webview ref="webview" :src="item.url"></webview>
    <img @click="back" class="backButton" src="~@/assets/back.png"/>
  </span>
</template>

<script>
export default {
  props: {
    item: { required: true },
  },
  methods: {
    back() {
      this.$refs.webview.goBack();
    },
  },
};
</script>

<style>
  webview {
    height: 75vh;
    width: 90vw;
  }
  .backButton {
    position: absolute;
    text-align: right;
    transform: translateY(-2.5rem);
  }
  .backButton:hover {
    filter: brightness(80%);
  }
  .webviewWrapper {
    display: flex;
    justify-content: flex-end;
  }
</style>
