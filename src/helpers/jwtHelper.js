export default {


    decodeClaim(claim, token) {
        try {
            const parsedToken = JSON.parse(atob(token.split('.')[1]))
            return parsedToken[claim];
        } catch (e) {
            return null;
        }
    },

    isNotExpired(token) {
        const exp = this.decodeClaim("exp", token);
        return exp > Date.now() / 1000
    },

    getJwtToken() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.jwtToken) {
            return user.jwtToken
        } else {
            return null
        }
    },

    getAuthorizationHeader() {
        let token = this.getJwtToken();
        if (typeof token != null) {
            return {
                'Authorization': token
            }
        } else return {};
    }
}
