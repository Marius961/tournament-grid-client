<template>
    <form @submit.prevent="submitForm()" class="row justify-content-center t-form">
        <h1 class="col-auto mb-0">Додати турнір</h1>
        <div class="w-100"></div>
        <div class="col-12 col-md-6 t-form">
            <label for="name">Назва турніру</label>
            <input v-model="tournament.name" type="text" id="name">
        </div>
        <div class="w-100"></div>
        <div class="col-12 col-md-6 t-form">
            <label for="location">Місце проведення</label>
            <input v-model="tournament.location" type="text" id="location">
        </div>
        <div class="w-100"></div>
        <div class="col-12 col-md-3 t-form">
            <label for="startDate">Дата початку</label>
            <input v-model="$v.tournament.startDate.$model" type="datetime-local" id="startDate">
        </div>
        <div class="col-12 col-md-3 t-form">
            <label for="endDate">Дата закінчення</label>
            <input v-model="$v.tournament.endDate.$model" type="datetime-local" id="endDate">
        </div>
        <div class="w-100"></div>
        <div class="col-12 col-md-6 mt-3">
            <div class="row" id="teamCountSelect">
                <div class="col-12 t-form">
                    <label for="teamCountSelect">Кількість команд у турнірі:</label>
                </div>
                <div class="col-auto radio-group">
                    <input v-model="teamsCount" id="t2" type="radio" value="2">
                    <label for="t2">2</label>
                </div>
                <div class="col-auto radio-group">
                    <input v-model="teamsCount" id="t4" type="radio" value="4">
                    <label for="t4">4</label>
                </div>
                <div class="col-auto radio-group">
                    <input v-model="teamsCount" id="t8" type="radio" value="8">
                    <label for="t8">8</label>
                </div>
                <div class="col-auto radio-group">
                    <input v-model="teamsCount" id="t16" type="radio" value="16">
                    <label for="t16">16</label>
                </div>
                <div class="col-auto radio-group">
                    <input v-model="teamsCount" id="t32" type="radio" value="32">
                    <label for="t32">32</label>
                </div>
                <div class="col-auto radio-group">
                    <input v-model="teamsCount" id="t64" type="radio" value="64">
                    <label for="t64">64</label>
                </div>
            </div>
        </div>
        <div class="w-100"></div>
        <div class="col-12 col-md-6">
            <transition-group name="component-fade" mode="out-in" tag="div" class="row">
                <div class="col-12 t-form" v-for="(team, index) in tournament.tournamentTeams" :key="'TournamentTeam' + index ">
                    <label :for="'team' + index">Команда {{index+1}}</label>
                    <input v-model="tournament.tournamentTeams[index].team.name" :id="'team' + index">
                </div>
            </transition-group>
        </div>
        <div class="col-12 mt-4 mb-4">
            <div class="row justify-content-center">
                <button :disabled="$v.$invalid" type="submit" class="col-12 col-md-auto t-btn t-btn-primary">Створити турнір</button>
            </div>
        </div>
    </form>
</template>

<script>

    import {mapActions} from 'vuex';
    import { required, minLength,  maxLength } from 'vuelidate/lib/validators'


    export default {
        data() {
            return {
                tournament: {
                    name: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    tournamentTeams: []
                },
                teamsCount: ''
            }
        },
        validations: {
            tournament: {
                name: {required, minLength: minLength(2), maxLength: maxLength(64)},
                location: {required, minLength: minLength(3), maxLength: maxLength(256)},
                startDate: {required},
                endDate: {required},
                tournamentTeams: {
                    required,
                    minLength: minLength(2),
                    $each: {
                        team: {
                            name: {required, minLength: minLength(3), maxLength: maxLength(32)}
                        }
                    }
                }
            }
        },
        methods: {
            ...mapActions(['postTournament']),
            generateTeamsInputs(teamsCount) {
                let teams = [];
                for (let i = 0; i < teamsCount; i++) {
                    teams.push({
                        team: {
                            name: ''
                        }
                    })
                }
                this.tournament.tournamentTeams = teams;
            },
            submitForm() {
                this.postTournament(this.tournament)
                    .then(() => {
                        this.$swal({
                            type: 'success',
                            title: 'Турнір створено!',
                            timer: 750,
                            showConfirmButton: false
                        }).then(() => {
                            this.$router.push("/tournaments");
                        })
                    })
                    .catch((error) => {
                        this.$swal({
                            type: 'error',
                            title: 'Невдалось створити турнір',
                            text: 'Перевірте правильність вказання дати початку та кінця, ' +
                                'турнір повинен починатись раніше ніж закінчується. Сервер повернув помилку: ' + error,
                            showConfirmButton: true,
                            confirmButtonText: 'OK'
                        })
                    })
            }
        },
        watch: {
            teamsCount: {
                handler(newVal) {
                    this.generateTeamsInputs(newVal);
                },
                deep: true
            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/forms.css";

    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .3s ease;
    }
    .component-fade-enter, .component-fade-leave-to
        /* .component-fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }
</style>
