<template>
  <div id="main-app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'App',
    components: {}
};
</script>

<style>
html,
body {
    height: 100%;
}
#main-app {
    width: 100%;
    height: 100%;
}
</style>
