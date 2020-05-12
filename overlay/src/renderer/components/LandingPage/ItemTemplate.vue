<template>
  <div>
    <font-awesome-icon fixed-width :icon="item.icon" />
    <span>{{ item.text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
  },
  mounted() {
    console.log('mounted');
  },
};
</script>
