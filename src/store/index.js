import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import user from './modules/user'
import tournament from './modules/tournament'

export default new Vuex.Store({
    modules: {
        user,
        tournament
    }
})
