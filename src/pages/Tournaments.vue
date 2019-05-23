<template>
    <div class="row">
        <tournament
                @deleteTournament="deleteTournamentFromList"
                class="col-12"
                :tournament="tournament"
                v-for="tournament in tournaments"
                :key="'tournament' + tournament.id"
        >

        </tournament>
        <div class="col-12">
            <pagination :pages="pages"></pagination>

        </div>
    </div>
</template>

<script>
    import TournamentItem from "../components/TournamentItem";
    import {mapActions} from 'vuex';
    import PaginationService from "../services/PaginationService";
    import Pagination from "../components/Pagination";

    export default {
        data() {
            return {
                query: {
                    p: this.$route.query.p ? this.$route.query.p : 0
                },
                pageData: {},
                tournaments: [],
                pages: []
            }
        },
        components: {
            "tournament": TournamentItem,
            "pagination": Pagination
        },
        methods: {
            ...mapActions({
                getTournaments: 'getTournaments',
                getTournament: 'getTournament'
            }),
            loadTournamentsList() {
                this.getTournaments(this.query)
                    .then((data) => {
                        this.pageData = data;
                        this.tournaments = data.content;
                        this.setPagination(this.pageData);
                    })
                    .catch(() => {
                        alert("loading error")
                    })
            },
            setPagination(pageData) {
                this.pages = PaginationService.generatePagination(pageData, this.$route.query, "/tournaments")
            },
            deleteTournamentFromList(id) {
                const index = this.tournaments.findIndex(el => el.id === id);
                this.tournaments.splice(index, 1);
            },
            updateTournament(id) {
                let updateTournamentId;
                let updateTournamentIndex;
                this.tournaments.map((el, index) => {
                    const matchIndex = el.matches.findIndex(m => m.id === id);
                    if (matchIndex > -1) {
                        const match = el.matches[matchIndex];
                        if (el.matches.includes(match)) {
                            updateTournamentId = el.id;
                            updateTournamentIndex = index;
                            return false;
                        }
                    }
                });

                this.getTournament(updateTournamentId)
                    .then((data) => {
                        this.tournaments.splice(updateTournamentIndex, 1, data);
                    })
                    .catch(() => {
                        alert('error')
                    })
            }
        },
        created() {
            this.loadTournamentsList();
            this.$eventBus.$on("updateTournament", this.updateTournament)
        }
    }
</script>

<style scoped>

</style>
