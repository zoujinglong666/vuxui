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
import myBottomSheet from '../views/BottomSheet.vue'
import mySlider from '../views/Slider.vue'

Vue.use(VueRouter)
export const routes = [{
    path: '/tag', component: myTag, meta: {
        title: "标签"
    }
}, {
    path: '/button', component: myButton, meta: {
        title: "按钮"
    }
}, {
    path: '/switch', component: mySwitch, meta: {
        title: "开关"
    }
}, {
    path: '/checkBox', component: myCheckBox, meta: {
        title: "单选框"
    }
}, {
    path: '/cell', component: myCell,
    meta: {
        title: "单元格"
    }
}, {
    path: '/dropDownMenu', component: myDropdownMenu, meta: {
        title: "下拉菜单"
    }
}, {
    path: '/progress', component: myProgress, meta: {
        title: "进度条"
    }
}, {

    path: '/dataCheckBox', component: myDataCheckBox, meta: {
        title: "数据复选框"
    }
}, {
    path: '/divider', component: myDivider, meta: {
        title: "分割线"
    }
}, {
    path: '/collapse', component: myCollapse, meta: {
        title: "折叠面板"
    }
}, {
    path: '/treeSelect', component: myTreeSelect, meta: {
        title: "树形选择"
    }
}, {
    path: "/radio", component: myRadio, meta: {
        title: "单选框"
    }
}, {
    path: "/swipeCell", component: mySwipeCell, meta: {
        title: "滑动单元格"
    }
}, {
    path: "/tab", component: myTab, meta: {
        title: "标签页"
    }
}, {
    path: "/popup", component: myPopup, meta: {
        title: "弹出层"
    }
}, {
    path: "/backTop", component: myBackTop, meta: {
        title: "回到顶部"
    }

}, {
    path: "/search", component: mySearch, meta: {
        title: "搜索框"
    }
}, {
    path: "/calendar", component: myCalendar, meta: {
        title: "日历"
    }

}, {
    path: "/picker", component: myPicker, meta: {
        title: "选择器"
    }
}, {
    path: "/overlay", component: myOverlay, meta: {
        title: "遮罩层"
    }
}, {
    path: "/message", component: myMessage, meta: {
        title: "消息"
    }
}, {
    path: "/list", component: myList, meta: {
        title: "虚拟列表"
    }
}, {
    path: "/segmented", component: mySegmented
    , meta: {
        title: "分段控制器"
    }
},
    {
        path: "/bottomSheet", component: myBottomSheet, meta: {
            title: "浮动面板"
        }
    },
    {
        path: "/slider",
        component: mySlider,
        meta: {
            title: "区间选择器"
        }

    },
    // {
    //     path: "/swipe", component: mySwipe
    // },
]


const router = new VueRouter({
    // mode:'history',//这种模式路径没有#号，看上去好看一点
    mode: 'hash', // 这种模式路径#号,
    routes
})
export default router
