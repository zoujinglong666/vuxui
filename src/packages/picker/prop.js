export const basePickerProp = {
    prop: {
        type: String
    },
    value: {
        value: {type: [String, Number, Array, Boolean, Object]},
    },
    readonly: {
        type: Boolean,
        default: false
    },
    columns: {
        type: [Array, Object]
    },
    title: String,
    confirmText: {
        type: [String, Number],
        default: '确认'
    },
    cancelText: {
        type: [String, Number],
        default: '取消'
    },
    showToolbar: {
        type: Boolean,
        default: true
    },
    allowHtml: {
        type: Boolean,
        default: false
    },
    defaultIndex: {
        type: [Number],
        default: 0
    },
    swipeDuration: {
        type: [Number],
        default: 1000
    },
    itemHeight: {
        type: [String, Number],
        default: 40
    },
    visibleItemCount: {
        type: [String, Number],
        default: 6
    },
//匹配不同字段
    columnsField: {
        type: Object,
        default: () => {
            return {
                text: 'text',
                values: 'values',
                children: 'children',
            }
        }
    },
    valueKey: {
        type: String,
        default: "text"
    },
}