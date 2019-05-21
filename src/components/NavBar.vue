<template>
    <nav class="row">
        <router-link to="/" tag="div" class="col-2 n-link n-logo">
            <img src="../assets/img/logo.png">
            Tournament Builder
        </router-link>
        <router-link to="/tournaments" tag="div" active-class="n-link-active" class="col-auto n-link">Турніри</router-link>
        <router-link v-if="isAdmin" to="/add-tournament" tag="div" active-class="n-link-active" class="col-auto n-link">Додати турнір</router-link>
        <router-link v-if="isAuthenticated" to="/logout" tag="div" class="col-auto n-link">Вихід</router-link>
    </nav>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters(['isAdmin','isAuthenticated'])
        }
    }
</script>

<style scoped>
    @import "../assets/css/NavBar.css";
</style>
