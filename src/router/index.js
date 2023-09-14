import Vue from 'vue'
import VueRouter from 'vue-router'
import myTag from "../views/Tag.vue"
import myButton from "../views/Button"
import mySwitch from "../views/Switch.vue"
import myCheckBox from "../views/CheckBox"
import myCell from "../views/Cell"
import myDropdownMenu from "../views/DropdownMenu"
import myProgress from "../views/Progress"
import myDataCheckBox from "../views/DataCheckBox"
import myDivider from '../views/Divider'
import myCollapse from '../views/Collapse'
import myTreeSelect from '../views/TreeSelect'
import myRadio from '../views/Radio'
import mySwipeCell from '../views/SwipeCell'
import myTab from '../views/Tab'
import myPopup from '../views/Popup'
import myBackTop from '../views/BackTop.vue'
import mySearch from '../views/Search.vue'
import myCalendar from '../views/Calendar.vue'
import myPicker from '../views/Picker.vue'
import myOverlay from '../views/Overlay.vue'
import myMessage from '../views/Message.vue'
import myList from '../views/List.vue'
import mySegmented from '../views/Segmented.vue'
import mySwipe from '../views/Swipe.vue'
import myBottomSheet from '../views/BottomSheet.vue'

Vue.use(VueRouter)
export const routes = [{path: '/tag', component: myTag}, {path: '/button', component: myButton}, {
    path: '/switch', component: mySwitch
}, {path: '/checkBox', component: myCheckBox}, {path: '/cell', component: myCell}, {
    path: '/dropDownMenu', component: myDropdownMenu
}, {path: '/progress', component: myProgress}, {
    path: '/dataCheckBox', component: myDataCheckBox
}, {path: '/divider', component: myDivider}, {path: '/collapse', component: myCollapse}, {
    path: '/treeSelect', component: myTreeSelect
}, {
    path: "/radio", component: myRadio
}, {
    path: "/swipeCell", component: mySwipeCell
}, {
    path: "/tab", component: myTab
}, {
    path: "/popup", component: myPopup
}, {
    path: "/backTop", component: myBackTop
}, {
    path: "/search", component: mySearch
}, {
    path: "/calendar", component: myCalendar
}, {
    path: "/picker", component: myPicker
}, {
    path: "/overlay", component: myOverlay
}, {
    path: "/message", component: myMessage
}, {
    path: "/list", component: myList
}, {
    path: "/segmented", component: mySegmented
}, {
    path: "/swipe", component: mySwipe
}, {
    path: "/bottomSheet", component: myBottomSheet
}]


const router = new VueRouter({
    // mode:'history',//这种模式路径没有#号，看上去好看一点
    mode: 'hash', // 这种模式路径#号,
    routes
})
export default router
