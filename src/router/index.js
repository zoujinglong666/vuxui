import Vue from 'vue'
import VueRouter from 'vue-router'
import tag from "../views/tag"

Vue.use(VueRouter)
const routes = [
    {path: '/tag', component: tag},
]

const router = new VueRouter({
    // mode:'history',//这种模式路径没有#号，看上去好看一点
    mode: 'hash', // 这种模式路径#号,
    routes
})
export default router
