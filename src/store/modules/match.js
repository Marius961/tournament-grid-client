import {$http, getBaseAuthConfig} from "../../axiosConfig";
import jwtHelper from "../../helpers/jwtHelper";

export default {
    state: {
        user: JSON.parse(localStorage.getItem('user'))
    },
    actions: {
        postMatchResult(context, result) {
            return new Promise((resolve, reject) => {
                $http.post('/api/matches/set-winner', null, {params : result, ...getBaseAuthConfig()})
                    .then(() => {
                        resolve();
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },
        getMatch(context, id) {
            return new Promise((resolve, reject) => {
                $http.get('/api/matches/' + id)
                    .then((response) => {
                        resolve(response.data);
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
