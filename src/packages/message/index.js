import Vue from "vue";

import messageComponent from "./src/index.vue";

let MessageConstructor = Vue.extend(messageComponent); // 引入一个message构造器，方便new之

let instance = null // 定义组件实例
let instances = []
let uuid = 0;
const types = ['success', 'info', 'warning', 'error']
const Message = function (options) {
    console.log(options)
    let id = `vux_message` + uuid++
    let offset = options.offset || 20;
    instance = new MessageConstructor({
        data: options,
        propsData: { // propsData传参，
            onClose: onCloseFn(id) // 传递一个函数，当MyMessage消失的时候，通知外界
        },


    })

    instances.forEach(item => {
        offset += item.$el.offsetHeight + 16;
    })
    instance.offset = offset;
    instance.id = id;
    instance.show = true;
    instance.$mount()
    document.body.appendChild(instance.$el);
    instances.push(instance)
    return instance

}

function onCloseFn(id) {
    let index = -1;
    let removeHeight;
    for (let i = 0; i < instances.length; i++) { // 遍历一下这个DOM伪数组
        let dom = instances[i].$el;
        if (dom.id === id) {
            removeHeight = dom.offsetHeight
            console.log(removeHeight)
            i = index;
            instances.splice(i, 1)

        }
    }

    // for (let k=0;k<instances.length;k++){
    //     let dom = instances[k].$el;
    //     dom.style['top'] = parseInt(dom.style['top']) - 60 + 'px'
    //
    // } // for (let k=0;k<instances.length;k++){
    //     let dom = instances[k].$el;
    //     dom.style['top'] = parseInt(dom.style['top']) - 60 + 'px'
    //
    // }
}


export default Message