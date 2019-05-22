<template>
    <nav class="row justify-content-between">
        <div class="col-auto">
            <div class="row justify-content-start">
                <router-link to="/" tag="div" class="col-auto n-link n-logo">
                    <img src="../assets/img/logo.png">
                    <span class="d-none d-md-inline">Tournament Builder</span>
                </router-link>
                <router-link to="/tournaments" tag="div" active-class="n-link-active" class="col-auto n-link">Турніри</router-link>
            </div>
        </div>
        <div class="col">
            <div class="row justify-content-end">
                <router-link v-if="isAdmin" to="/add-tournament" tag="div" active-class="n-link-active" class="col-auto n-link nav-action">
                    <i class="fas fa-plus-square d-md-none"></i>
                    <span class="d-none d-md-inline">Додати турнір</span>
                </router-link>
                <router-link v-if="isAuthenticated" to="/logout" tag="div" class="col-auto n-link nav-action">
                    <i class="fas fa-sign-out-alt d-md-none"></i>
                    <span class="d-none d-md-inline">Вихід</span>
                </router-link>
            </div>
        </div>
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
