import Vue from 'vue'
import Router from 'vue-router'
import Home from "../pages/Home";
import Tournaments from "../pages/Tournaments";
import AddTournament from "../pages/AddTournament";
import Login from "../pages/Login";
import jwtHelper from "../helpers/jwtHelper";
import Logout from "../pages/Logout";

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                bodyClass: 'h-body'
            }
        },
        {
            path: '/tournaments',
            component: Tournaments
        },
        {
            path: '/add-tournament',
            component: AddTournament,
            meta: {
                requiresRoles: ["ADMIN"]
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                isAnonymousOnly: true
            }
        },
        {
            path: "/logout",
            component: Logout
        }
    ]
});

router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const isFullyAuthenticated = user && user.roles && user.jwtToken && jwtHelper.isNotExpired(user.jwtToken);

    if (to.meta.isAnonymousOnly) {
        if (!user) {
            next();
        } else next("/");
    }

    else if (to.meta.requiresAuth && !to.meta.requiresRoles) {
        if (isFullyAuthenticated) {
            next();
        } else {
            localStorage.clear();
            next("/login")
        }
    }

    else if (to.meta.requiresRoles) {
        if (isFullyAuthenticated) {
            let roles = user.roles;
            const found = to.meta.requiresRoles.some(r => roles.indexOf(r) >= 0);
            if (found) {
                next();
            } else {
                next('/404')
            }
        } else {
            localStorage.clear();
            next("/login");
        }
    }
    else next();
});

export default router;

