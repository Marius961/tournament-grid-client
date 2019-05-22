<template>
    <div class="row">
        <tournament
                @deleteTournament="deleteTournamntFronList"
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
                getTournaments: 'getTournaments'
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
            deleteTournamntFronList(id) {
                const index = this.tournaments.findIndex(el => el.id === id);
                this.tournaments.splice(index, 1);
            }
        },
        created() {
            this.loadTournamentsList();
        }
    }
</script>

<style scoped>

</style>
