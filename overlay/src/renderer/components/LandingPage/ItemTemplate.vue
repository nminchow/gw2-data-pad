<template>
  <div>
    <font-awesome-icon fixed-width :icon="item.icon" :spin="item.spin" />
    <span>{{ item.text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
  },
};
</script>
