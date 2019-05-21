import axios from 'axios'
import jwtHelper from "./helpers/jwtHelper";

export const $http = axios.create({
    baseURL: 'http://localhost:8090',
});


export function getBaseAuthConfig() {
    return {
        headers: {
            ...jwtHelper.getAuthorizationHeader()
        }
    }
}
