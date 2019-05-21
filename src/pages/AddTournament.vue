<template>
    <form @submit.prevent="submitForm()" class="row justify-content-center t-form">
        <h1 class="col-auto mb-0">Додати турнір</h1>
        <div class="w-100"></div>
        <div class="col-6 t-form">
            <label for="name">Назва турніру</label>
            <input v-model="tournament.name" type="text" id="name">
        </div>
        <div class="w-100"></div>
        <div class="col-6 t-form">
            <label for="location">Місце проведення</label>
            <input v-model="tournament.location" type="text" id="location">
        </div>
        <div class="w-100"></div>
        <div class="col-3 t-form">
            <label for="startDate">Дата початку</label>
            <input v-model="tournament.startDate" type="datetime-local" id="startDate">
        </div>
        <div class="col-3 t-form">
            <label for="endDate">Дата закінчення</label>
            <input v-model="tournament.endDate" type="datetime-local" id="endDate">
        </div>
        <div class="w-100"></div>
        <div class="col-6 t-form">
            <label for="description">Місце проведення</label>
            <textarea v-model="tournament.description" rows="8" id="description"></textarea>
        </div>
        <div class="w-100"></div>
        <div class="col-6">
            <div class="row">
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
        <div class="col-6">
            <div class="row">
                <div class="col-12 t-form" v-for="(team, index) in tournament.tournamentTeams">
                    <label :for="'team' + index">Команда {{index+1}}</label>
                    <input v-model="tournament.tournamentTeams[index].team.name" :id="'team' + index">
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="row justify-content-center">
                <button type="submit" class="col-auto">Відправити форму</button>
            </div>
        </div>
    </form>
</template>

<script>

    import {mapActions} from 'vuex';

    export default {
        data() {
            return {
                tournament: {
                    name: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                    tournamentTeams: []
                },
                teamsCount: ''
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
                        alert('success')
                    })
                    .catch(() => {
                        alert('error')
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
</style>
