import Vue from 'vue'
import App from './App.vue'
import "./packages/index"
import './directives/index'
import router from './router'
import '../src/style/base.less'
import '../src/assets/icon/iconfont.css'

Vue.config.productionTip = false
new Vue({
    render: function (h) {
        return h(App)
    },
    router
}).$mount('#app')




