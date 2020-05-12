<template>
  <webview :src="item.url" style="height: 75vh; width: 90vw;"/>
</template>

<script>
export default {
  props: {
    item: { required: true },
  },
};
</script>
