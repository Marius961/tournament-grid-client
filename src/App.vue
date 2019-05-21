<template>
  <div class="container-fluid">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  components: {
    "nav-bar": NavBar
  }
}
</script>

<style>
  @import "assets/css/main.css";
</style>
