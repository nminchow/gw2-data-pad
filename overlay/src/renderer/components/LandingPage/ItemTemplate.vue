<template>
  <div>
    <b>#{{ item.id }}</b>
    <span>{{ item.name }}</span>
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
