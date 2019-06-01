<template>
    <form @submit.prevent="setMatchWinner" class="col-12 match">
        <button :disabled="$v.$invalid" class="confirm-btn" v-if="!winnerId && isAdmin">
            <i class="fas fa-check"></i>
        </button>
        <div class="row" style="border-bottom: 1px solid #454545">
            <div class="col" :class="{'team-winner': winnerId === match.firstTeam.team.id}">{{match.firstTeam.team.name}}</div>
            <input :disabled="winnerId || !isAdmin" type="text" class="col-auto result" v-model="firstTeamResult">
        </div>
        <div class="row">
            <div class="col" :class="{'team-winner': winnerId === match.secondTeam.team.id}">{{match.secondTeam.team.name}}</div>
            <input :disabled="winnerId || !isAdmin" type="text" class="col-auto result" v-model="secondTeamResult">
        </div>
    </form>
</template>

<script>


    import { required, numeric, not, sameAs } from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters(['isAdmin']),
            winnerId() {
                if (this.match.winner && this.match.winner.team.id) {
                    return this.match.winner.team.id;
                } else {
                    return undefined;
                }
            }
        },
        props: {
            match: {
                required: true
            }
        },
        validations: {
            firstTeamResult: {required, numeric, secondTeamResult: not(sameAs('secondTeamResult'))},
            secondTeamResult: {required, numeric}
        },
        data() {
            return {
                firstTeamResult: '',
                secondTeamResult: ''
            }
        },
        methods: {
            ...mapActions(['postMatchResult', 'getMatch']),
            setMatchWinner() {
                const result = {
                    matchId: this.match.id,
                    firstTeamResult: +this.firstTeamResult,
                    secondTeamResult: +this.secondTeamResult
                };
                console.log(result)
                this.postMatchResult(result)
                    .then(() => {
                        this.$eventBus.$emit("updateTournament", this.match.id);
                        this.$swal({
                            title: 'Збережено',
                            timer: 1000,
                            type: 'success',
                            toast: true,
                            position: 'top',
                            showConfirmButton: false
                        });
                    })
                    .catch((error) => {
                        this.$eventBus.$emit("updateTournament", this.match.id);
                        this.$swal({
                            title: 'Помилка збереження',
                            type: 'error',
                            text: 'Невдалось зберегти результат. Сервер повернув помилку: ' + error,
                            confirmButtonText: 'ОК'
                        });
                    })
            }
        },
        created() {
            if (this.match.firstTeamResult > 0) {
                this.firstTeamResult = this.match.firstTeamResult;
            }
            if (this.match.secondTeamResult > 0) {
                this.secondTeamResult = this.match.secondTeamResult;
            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/tournamentGrid.css";
</style>
