<template>
    <form @submit.prevent="setMatchWinner" class="col-12 match">
        <button :disabled="$v.$invalid" class="confirm-btn" v-if="!winnerId && isAdmin">
            <i class="fas fa-check"></i>
        </button>
        <div class="row" style="border-bottom: 1px solid #454545">
            <div class="col" :class="{'team-winner': winnerId === match.firstTeam.team.id}">{{match.firstTeam.team.name}}</div>
            <input :disabled="winnerId || !isAdmin" type="text" class="col-auto result" v-model="match.firstTeamResult">
        </div>
        <div class="row">
            <div class="col" :class="{'team-winner': winnerId === match.secondTeam.team.id}">{{match.secondTeam.team.name}}</div>
            <input :disabled="winnerId || !isAdmin" type="text" class="col-auto result" v-model="match.secondTeamResult">
        </div>
    </form>
</template>

<script>


    import { required, numeric } from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters(['isAdmin'])
        },
        props: {
            matchData: {
                required: true
            }
        },
        validations: {
            match: {
                firstTeamResult: {required, numeric},
                secondTeamResult: {required, numeric}
            }
        },
        data() {
            return {
                winnerId: '',
                match: {}
            }
        },
        methods: {
            ...mapActions(['postMatchResult', 'getMatch']),
            setMatchWinner() {
                const result = {
                    matchId: this.match.id,
                    firstTeamResult: this.match.firstTeamResult,
                    secondTeamResult: this.match.secondTeamResult
                };
                this.postMatchResult(result)
                    .then(() => {
                        this.loadMatch();
                    })
                    .catch(() => {
                        alert('error')
                    })
            },
            loadMatch() {
                this.getMatch(this.match.id)
                    .then((data) => {
                        this.match = data;
                        this.setData();
                    })
            },
            setData() {
                if (this.match.winner && this.match.winner.team.id) {
                    this.winnerId = this.match.winner.team.id;
                } else {
                    this.winnerId = undefined;
                    this.match.firstTeamResult = '';
                    this.match.secondTeamResult = '';
                }
            }
        },
        created() {
            this.match = this.matchData;
            this.setData();
        }
    }
</script>

<style scoped>
    @import "../assets/css/tournamentGrid.css";
</style>
