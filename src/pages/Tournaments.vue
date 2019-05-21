<template>
    <div>
        <h1>Tournaments</h1>
        <tournament-grid></tournament-grid>
    </div>
</template>

<script>
    import TournamentGrid from "../components/TournamentGrid";

    export default {
        components: {
            "tournament-grid": TournamentGrid
        }
    }
</script>

<style scoped>

</style>
