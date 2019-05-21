import userHelper from "../../helpers/userHelper";
import {$http} from "../../axiosConfig";
import jwtHelper from "../../helpers/jwtHelper";

export default {
    state: {
        user: JSON.parse(localStorage.getItem('user'))
    },
    actions: {
        login(context, credentials) {
            return new Promise((resolve, reject) => {
                $http.post('/api/auth/sign-in', credentials)
                    .then((response) => {
                        const jwtToken = response.headers['authorization'];
                        let roles = jwtHelper.decodeClaim('roles', jwtToken);
                        if (roles && jwtToken) {
                            context.commit('LOGIN_SUCCESS', { username: credentials.username, jwtToken, roles });
                            resolve();
                        } else {
                            reject();
                        }
                    })
                    .catch(() => {
                        reject();
                    })
            })
        }
    },
    mutations: {
        LOGIN_SUCCESS(state, response) {
            localStorage.setItem('user', JSON.stringify(response));
            state.user = response;
        },
        LOGOUT(state) {
            state.user = null;
            localStorage.clear();
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.user !== null;
        },
        isAdmin() {
            return userHelper.isUserHasRole("ADMIN");
        }
    }
}
