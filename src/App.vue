<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* 不设置就没有高度 */
  height:100%;
  
}
html,body{
  /* 不设置就没有高度 */
  height:100%;
}
*{
  margin:0;
  padding:0;
}
</style>
