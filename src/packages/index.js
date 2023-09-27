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
import vuxStep from './step/index'
import vuxSteps from './steps/index'
import vuxTree from './tree/index'
import vuxCell from './cell/index'
import vuxNavbar from './navBar/index'
import vuxSpace from './space/index'
import vuxDivider from './divider/index'
import vuxSwipeCell from './swipeCell/index'
import vuxTab from './tab/index'
import vuxTabs from './tabs/index'
import vuxPopup from './popup/index'
import vuxBackTop from './backTop/index'
import vuxPicker from './picker/index'
import vuxBottomSheet from './bottomSheet/index'
import vuxCircleProgress from './circleProgress'
import Message from "@/packages/message/index";
import vuxStepper from "@/packages/steper/src/index.vue";
// 将各个封装的组件使用一个数组保存，便于统一注册
const components = [
    vuxRadio,
    vuxTree,
    vuxCell,
    vuxStep,
    vuxSteps,
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
    vuxCheckBox,
    vuxNavbar,
    vuxSpace,
    vuxDivider,
    vuxSwipeCell,
    vuxTabs,
    vuxTab,
    vuxPopup, vuxBackTop, vuxPicker, vuxBottomSheet,
    vuxCircleProgress,
    vuxStepper,
]

// 使用定义注册函数
const installComponents = function (Vue) {
    // 遍历注册组件
    components.forEach((component) => {
        Vue.component(component.name, component)
    })
    // 原型链注册
    Vue.prototype.$msg = Message;
}

// 调用注册函数，去统一注册组件
installComponents(Vue)

// 分别暴露、便于引入使用
export {
    Message
}
