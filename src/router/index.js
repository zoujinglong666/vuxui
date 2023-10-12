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
import myCircleProgress from '../views/CircleProgress.vue'
import myCanvas from '../views/Canvas.vue'
import myAvatar from '../views/Avatar.vue'
import mySteps from '../views/Step.vue'
import myStepper from '../views/Stepper.vue'
import myTable from '../views/Table.vue'
import mySpace from '../views/Space.vue'
import myTree from '../views/Tree.vue'
import myRate from '../views/Rate.vue'
import myActionSheet from '../views/ActionSheet.vue'
import myEllipsis from '../views/Ellipsis.vue'
import myFab from '../views/fab.vue'
import myDialog from '../views/Dialog.vue'
import myKeyBoard from '../views/KeyBoard.vue'
import mySticky from '../views/Sticky.vue'

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
        title: "复选框"
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
        title: "分类选择"
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
    path: "/msg", component: myMessage, meta: {
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
    {
        path: "/circleProgress",
        component: myCircleProgress,
        meta: {
            title: "环形进度条"
        }

    },
    {
        path: "/canvas",
        component: myCanvas,
        meta: {
            title: "签字"
        }

    },
    {
        path: "/avatar",
        component: myAvatar,
        meta: {
            title: "头像"
        }

    },
    {
        path: "/steps",
        component: mySteps
        ,
        meta: {
            title: "步骤条"
        }

    },

    {
        path: "/stepper",
        component: myStepper
        ,
        meta: {
            title: "步进器"
        }

    },
    // {
    //     path: "/noticebar",
    //     component: myNoticebar
    //     ,
    //     meta: {
    //         title: "通知滚动"
    //     }
    //
    // },
    {
        path: "/table",
        component: myTable
        ,
        meta: {
            title: "表格"
        }

    },
    {
        path: "/space",
        component: mySpace
        ,
        meta: {
            title: "间距"
        }

    },
    {
        path: "/tree",
        component: myTree
        ,
        meta: {
            title: "树形选择"
        }

    },
    // {
    //     path: "/badge",
    //     component: myBadge
    //     ,
    //     meta: {
    //         title: "标记"
    //     }
    //
    // },
    {
        path: "/rate",
        component: myRate
        ,
        meta: {
            title: "评分"
        }

    }, {
        path: "/actionsheet",
        component: myActionSheet
        ,
        meta: {
            title: "动作面板"
        }

    }, {
        path: "/ellipsis",
        component: myEllipsis
        ,
        meta: {
            title: "文本省略"
        }

    }, {
        path: "/fab",
        component: myFab
        ,
        meta: {
            title: "悬浮"
        }

    }, {
        path: "/dialog",
        component: myDialog
        ,
        meta: {
            title: "弹出框"
        }

    }, {
        path: "/keyboard",
        component: myKeyBoard
        ,
        meta: {
            title: "数字键盘"
        }

    }, {
        path: "/sticky",
        component: mySticky
        ,
        meta: {
            title: "粘性布局"
        }

    },


    // {
    //     path: "/swipe", component: mySwipe
    // },
]

console.log(routes.length);
const router = new VueRouter({
    // mode:'history',//这种模式路径没有#号，看上去好看一点
    mode: 'hash', // 这种模式路径#号,
    routes
})
export default router
