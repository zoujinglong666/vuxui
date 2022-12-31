import Vue from 'vue'
import App from './App.vue'
import "./packages/index"
import './directives/index'
import router from './router'


Vue.config.productionTip = false
new Vue({
    render: function (h) {
        return h(App)
    },
    router
}).$mount('#app')
