<template>

</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        methods: {
            ...mapMutations(["LOGOUT"])
        },
        created() {
            this.LOGOUT();
            this.$router.push("/login");
        }
    }
</script>

<style scoped>

</style>
