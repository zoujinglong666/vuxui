<template>
  <div class="vux__step">

    <div class="vux__step__circle" @click="onClickStep(title)">
      <div :class="`is-${getState(title)}`" class="vux__step__icon">
        <span v-if="actived(title)"
              class="actived"></span>
        <span class=""></span>
      </div>
      <div
          :class="`is-${getState(title)}`"
          class="vux__step__line"></div>
    </div>
    <div :class="`is-${getState(title)}`"
         class="vux__step__title" @click="onClickStep(title)">
      <slot name="title">{{ title }}</slot>
    </div>
  </div>
</template>

<script>
export default {


  // 名称	说明
  // default	步骤内容
  // active-icon	自定义激活状态图标
  // inactive-icon	自定义未激活状态图标
  name: "vuxStep",
  data() {
    return {
      titleList: [],
    }
  },
  props: {
    title: {
      type: [String, Number]
    },
  },
  computed: {


    active() {
      return this.$parent.active
    },
    direction() {
      return this.$parent.direction
    }
  },
  beforeCreate() {
    this.$parent.steps.push(this);
  },

  beforeDestroy() {
    const steps = this.$parent.steps;
    const index = steps.indexOf(this);
    if (index >= 0) {
      steps.splice(index, 1);
    }


  },
  created() {
    this.titleList = [...new Set(this.$parent.steps.map(item => item.title))];
    this.getState()
  },

  methods: {
    actived(title) {
      return this.active === this.findItemIndex(title)
    },
    findItemIndex(item) {
      return this.titleList.findIndex(it => it == item)
    },
    getState(title) {
      const titleIndex = this.titleList.findIndex(item => item === title)
      if (titleIndex < this.active) {
        return 'finish';
      }
      return titleIndex === this.active ? 'process' : 'waiting';


    },

    onClickStep(title) {
      const index = this.titleList.findIndex(item => item === title)
      if (this.active === index) {
        return
      }
      this.$parent.updateParent(index)
    }
  }

}
</script>

<style lang="less" scoped>

.vux__step {
  position: relative;
  justify-content: space-around;

  flex: 1;

  width: 100%;


  .vux__step__title {
    text-align: center;
    font-size: 12px;
    color: #333;

    &.is-waiting {
      color: #A6A7A9
    }

    &.is-process {
      color: #1989fa;
    }
  }

  .vux__step__circle {
    padding-top: 16px;
    position: relative;
    //text-align: center;
  }

  .vux__step__icon {
    z-index: 2;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #1989fa;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: background-color 0.5s ease-in-out;

    &.is-waiting {
      background-color: #EBEDF0;
    }

    span {
      z-index: 2;
      font-size: 6px;
      color: #ffffff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .vux__step__line {
    height: 0.5px;
    z-index: 0;
    border-top: 1px solid #1989fa;
    position: absolute;
    //right: -50%;
    left: 50%;
    top: 50%;
    transform: translate(0);
    width: 100%;
    transition: border-top-color 0.5s ease-in-out;
    //process

    &.is-waiting, &.is-process {
      border-top: 1px solid #EBEDF0;
    }


  }


}

.vux__step:last-child .vux__step__line {
  //display: none;
  width: 0;
}

.actived {
  display: inline-block;
  background-color: #FFFFFF;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}


</style>
