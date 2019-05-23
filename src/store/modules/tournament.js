import {$http, getBaseAuthConfig} from "../../axiosConfig";
import jwtHelper from "../../helpers/jwtHelper";

export default {
    state: {
        user: JSON.parse(localStorage.getItem('user'))
    },
    actions: {
        postTournament(context, tournament) {
            return new Promise((resolve, reject) => {
                $http.post('/api/tournaments', tournament, getBaseAuthConfig())
                    .then(() => {
                        resolve();
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },
        deleteTournament(context, tournamentId) {
            return new Promise((resolve, reject) => {
                $http.delete('/api/tournaments/' + tournamentId, getBaseAuthConfig())
                    .then(() => {
                        resolve();
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },
        getTournament(context, tournamentId) {
            return new Promise((resolve, reject) => {
                $http.get('/api/tournaments/' + tournamentId)
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },
        getTournaments(context, query) {
            return new Promise((resolve, reject) => {
                $http.get("/api/tournaments", {params: query})
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                    })
            })
        }
    },
    mutations: {

    },
    getters: {

    }
}
