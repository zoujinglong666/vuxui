import Vue from 'vue'
import VueRouter from 'vue-router'
import tag from "../views/tag"
import button from "../views/button"

Vue.use(VueRouter)
const routes = [
    {path: '/tag', component: tag},
    {path: '/button', component: button},
]

const router = new VueRouter({
    // mode:'history',//这种模式路径没有#号，看上去好看一点
    mode: 'hash', // 这种模式路径#号,
    routes
})
export default router
