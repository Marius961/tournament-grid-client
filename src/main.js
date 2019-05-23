import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import vBClass from 'vue-body-class'
import VueSweetAlert2 from 'vue-sweetalert2';

Vue.prototype.$eventBus = new Vue();
Vue.use(Vuelidate);

const SwaiOptions = {
    background: '#f9f9f9',
    backdrop: 'rgba(0, 0, 0, 0.32)',
    confirmButtonColor: '#2C526A'
};


Vue.use(VueSweetAlert2, SwaiOptions);
Vue.use(vBClass, router);

Vue.config.productionTip = false;


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
