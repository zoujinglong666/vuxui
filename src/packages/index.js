import Vue from "vue";

// 引入各个封装的组件
import vuxAvatar from "./avatar/index"
import vuxDropDownMenuItem from "./dropDownMenuItem/index"
import vuxDropDownMenu from "./dropDownMenu/index"
import VuxSegmented from "./segmented/index"
import vuxButton from "./button/index"
import vuxTag from "./tag/index"
import vuxSwitch from './switch/index'
import vuxSearch from './search/index'
import vuxDataCheckBox from './dataCheckBox/index'
import vuxProcess from './process/index'
import vuxFab from './fab/index'
import vuxCollapseItem from './collapseItem/index'
import vuxCollapse from './collapse/index'
import vuxCalender from './calendar/index'
import vuxCanvas from './canvas/index'
import vuxNoticeBar from './NoticeBar/index'
import VuxSlider from './slider/index'
import vuxDrawer from './drawer/index'
import transitionHeight from './transitionHeight/index'
import vuxTreeSelect from './treeSelect/index'
import vuxCheckBox from './checkBox/index'
import vuxCheckBoxGroup from './checkBoxGroup/index'
import vuxRadio from './radio/index'
import vuxRadioGroup from './radioGroup/index'
import vuxDialog from './dialog/index'

// 将各个封装的组件使用一个数组保存，便于统一注册
const components = [
    vuxRadio,
    vuxDialog,
    vuxRadioGroup,
    vuxAvatar,
    VuxSegmented,
    vuxDropDownMenuItem,
    vuxDropDownMenu,
    vuxDrawer,
    vuxCanvas,
    vuxButton,
    vuxTag,
    vuxSwitch,
    vuxSearch,
    vuxDataCheckBox,
    VuxSlider,
    vuxProcess,
    vuxFab,
    vuxCollapse,
    vuxCalender,
    vuxCollapseItem,
    vuxNoticeBar,
    transitionHeight,
    vuxTreeSelect,
    vuxCheckBoxGroup,
    vuxCheckBox
]

// 使用定义注册函数
const installComponents = function (Vue) {
    // 遍历注册组件
    components.forEach((component) => {
        Vue.component(component.name, component)
    })
    // 原型链注册
}

// 调用注册函数，去统一注册组件
installComponents(Vue)

// 分别暴露、便于引入使用
