import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import vBClass from 'vue-body-class'
import VueSweetAlert2 from 'vue-sweetalert2';

Vue.prototype.$eventBus = new Vue();


Vue.use(Vuelidate);
Vue.use(VueSweetAlert2);
Vue.use(vBClass, router);

Vue.config.productionTip = false;


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
