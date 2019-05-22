<template>
    <div>
        <div class="row tournament justify-content-between">
            <div class="col-12 p-4">
                <div class="row ">
                    <div class="col">
                        <div class="row">
                            <div class="col-12 col-md-4">
                                <div class="row">
                                    <h3 class="col-12">{{tournament.name}}</h3>
                                    <div class="col-12" v-if="tournament.tournamentWinner">
                                        <i class="fas fa-trophy"></i>
                                        <span class="font-weight-bold">Переможець:</span>
                                        {{tournament.tournamentWinner.name}}
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-3">
                                <div class="row">
                                    <div class="col-auto font-weight-bold">Місце проведення:</div>
                                    <div class="col">{{tournament.location}}</div>
                                </div>
                            </div>
                            <div class="col-12 col-md">
                                <div class="row text-right">
                                    <div class="col-12 font-weight-bold">Дати проведення:</div>
                                    <div class="col-12">Початок: {{toDate(tournament.startDate)}}</div>
                                    <div class="col-12">Кінець: {{toDate(tournament.endDate)}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-2 align-self-center mt-3 mt-md-0">
                        <div class="row">
                            <button @click="isShowTournamentGrid = !isShowTournamentGrid" class="col-12 t-btn t-btn-primary">
                                <i class="fas" :class="{'fa-caret-up': isShowTournamentGrid, 'fa-caret-down': !isShowTournamentGrid}"></i>
                                {{isShowTournamentGrid ? 'Приховати турнірну сітку' : 'Показати турнірну сітку'}}
                            </button>
                        </div>
                    </div>
                    <div class="w-100"></div>
                    <div class="col grid-wrapper" v-if="isShowTournamentGrid">
                        <tournament-grid :teams-count="tournament.tournamentTeams.length" :matches="tournament.matches"></tournament-grid>
                    </div>
                </div>
            </div>
            <div class="col-12 actions-bar" v-if="isAdmin">
                <div class="row justify-content-end">
                    <button @click="submitDeleting(tournament.id)" class="col-auto t-btn ">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TournamentGrid from "./TournamentGrid";
    import {mapGetters, mapActions} from 'vuex'

    export default {
        computed: {
          ...mapGetters(['isAdmin'])
        },
        data() {
          return {
              isShowTournamentGrid: false
          }
        },
        props: {
            tournament: {
                type: Object,
                required: true
            }
        },
        components: {
            "tournament-grid": TournamentGrid
        },
        methods: {
            ...mapActions(['deleteTournament']),
            toDate(timestamp) {
                return new Date(timestamp).toLocaleString();
            },
            submitDeleting(id) {
                this.deleteTournament(id)
                    .then(() => {
                        this.$emit("deleteTournament", id);
                    })
                    .catch(() => {
                        alert('error');
                    })
            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/tournament.css";
</style>
