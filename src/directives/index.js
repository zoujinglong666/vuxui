import touch from "./touch";
import clickoutside from "./clickoutside";
import Vue from "vue";
//指令中转站  第一参数指令名字，第二参数指令函数
Vue.directive('touch', touch);
Vue.directive('clickoutside', clickoutside);
