import Vue from 'vue'
import VueRouter from 'vue-router'
import myTag from "../views/tag"
import myButton from "../views/Button"
import mySwitch from "../views/switch"
import myCheckBox from "../views/CheckBox"
import myCell from "../views/Cell"
import myDropdownMenu from "../views/DropdownMenu"
import myProgress from "../views/Progress"
import myDataCheckBox from "../views/DataCheckBox"
import myDivider from '../views/Divider'
import myCollapse from '../views/Collapse'
import myTreeSelect from '../views/TreeSelect'

Vue.use(VueRouter)
export const routes = [{path: '/tag', component: myTag}, {path: '/button', component: myButton}, {
    path: '/switch', component: mySwitch
}, {path: '/checkBox', component: myCheckBox}, {path: '/cell', component: myCell}, {
    path: '/dropDownMenu', component: myDropdownMenu
}, {path: '/progress', component: myProgress}, {
    path: '/dataCheckBox', component: myDataCheckBox
}, {path: '/divider', component: myDivider}, {path: '/collapse', component: myCollapse}, {
    path: '/treeSelect', component: myTreeSelect
}]


const router = new VueRouter({
    // mode:'history',//这种模式路径没有#号，看上去好看一点
    mode: 'hash', // 这种模式路径#号,
    routes
})
export default router
