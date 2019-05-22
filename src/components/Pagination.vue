<template>
    <div class="row justify-content-center pagination" v-if="pages.length > 1">
        <router-link
                :class="{'active': page.isCurrent}"
                v-for="page in pages"
                :key="'page' + page.name"
                :to="{ path: page.url, query: page.query }"
        >
            {{page.name}}
        </router-link>
    </div>
</template>

<script>
    export default {
        props: {
            pages: {
                required: true,
                type: Array
            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/pagination.css";
</style>
