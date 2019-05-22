import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import user from './modules/user'
import tournament from './modules/tournament'
import match from './modules/match'

export default new Vuex.Store({
    modules: {
        user,
        tournament,
        match
    }
})
