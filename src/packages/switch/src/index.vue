<template>
    <span :class="{'disabled':disabled}" :style="{backgroundColor:checked?activeColor:inactiveColor}"
          class="switch-content"
          @click="onClick">
      <span v-if="showText" :class="{'checked':checked}" class="switch-text">{{ checked ? '开' : '关' }}</span><span
        :class="{'checked':checked}"
        class="switch-bar">
      <span v-if="loading">
      <i :class="{'loading':loading}">
      </i>
    </span>
    </span>
    </span>
</template>
<script>
export default {
  name: "vuxSwitch",
  model: {
    prop: 'value',
  },
  props: {
    value: {
      type: [Boolean, String, Number, Object, Array],
    },
    disabled: {
      type: Boolean
    },
    loading: {
      type: Boolean

    },
    showText: {
      type: Boolean
    },
    activeColor: {
      type: String,
      default: '#0068ff'
    },
    inactiveColor: {
      type: String,
      default: '#fff'

    },
    activeValue: {
      type: [Boolean, String, Number, Object, Array],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number, Object, Array],
      default: false
    },
    size: {
      type: [Number, String]
    }
  },

  computed: {
    checked() {
      return this.value === this.activeValue;
    },
  },
  methods: {
    onClick(event) {
      if (!this.disabled && !this.loading) {
        this.$emit('click', event);
        const newValue = this.checked ? this.inactiveValue : this.activeValue;
        this.$emit('input', newValue);
        this.$emit('change', newValue);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.switch-content {
  display: inline-flex;
  align-items: center;
  position: relative;
  width: 50px;
  height: 26px;
  line-height: 26px;
  border-radius: 26px;
  text-align: center;
  transition: background-color 0.3s linear;
  border: none !important;
  border: 0 !important;
  box-shadow: 0 0 0 0.5px #e2e0e0;
  &.disabled {
    opacity: 0.6 !important;
    cursor: not-allowed !important;
  }
  .loading {
    width: 8px;
    height: 8px;
    border: 1px solid #C0C4CC;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    clip-path: polygon(0% 0%, 100% 0%, 100% 30%, 0% 30%);
    animation: loading 1s linear infinite;
  }
  @-webkit-keyframes loading {
    from {
      transform: rotatez(0deg);
    }

    to {
      transform: rotatez(360deg);
    }
  }

  @keyframes loading {
    from {
      transform: rotatez(0deg);
    }

    to {
      transform: rotatez(360deg);
    }
  }

}

.switch-text {
  transition: all 0.3s linear;
  color: #fff;
  font-size: 12px;
  position: absolute;
  left: 100%;
  transform: translateX(-120%) !important;


  &.checked {
    left: 0;
    transform: translateX(50%) !important;
  }

  //color: #fff;
}

.switch-bar {
  transition: all 0.3s linear;
  position: absolute;
  left: 2%;
  width: 24px;
  height: 24px;
  border-radius: 24px;
  background-color: #fff;
  box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);

  &.checked {
    left: 98% !important;
    transform: translateX(-100%) !important;
  }

}
</style>