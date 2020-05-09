<template>
  <webview :src="item.url" style="height: 80vh; width: 90vw;"/>
</template>

<script>
export default {
  props: {
    item: { required: true },
  },
  mounted() {
    console.log('webmounte');
  },
};
</script>
