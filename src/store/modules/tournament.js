import userHelper from "../../helpers/userHelper";
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
        }
    },
    mutations: {

    },
    getters: {

    }
}
