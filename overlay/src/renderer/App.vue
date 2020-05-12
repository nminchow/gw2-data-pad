<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'data-core',
  };
</script>

<style>
@import url("https://d1h9a8s8eodvjz.cloudfront.net/fonts/menomonia/08-02-12/menomonia.css");

#app {
  margin-top: 15vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  flex-direction: column;
  flex: 1;
  font-family: 'Menomonia';
}

input {
  font-family: inherit;
  font-weight: bold;
}
</style>
