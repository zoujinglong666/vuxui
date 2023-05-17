<template>
  <div class="vux-avatar">
    <div v-if="type.includes('image')">
      <img :class="[size,shape]"
           :src="src"
           alt="" class="image-avatar"/>
      <span v-if="badge||badge===0" :class="[badgeVal>0?'vux-avatar-badge val':'vux-avatar-badge ']">{{
          badgeVal
        }}</span>
    </div>
    <div v-if="type.includes('text')">
              <span :class="[size,shape]" :style="{backgroundColor:bgColor,color:textColor}" class="text-avatar">
              {{ avatarText }}
            </span>
      <span v-if="badge||badge===0"
            :class="[badgeVal>0||badgeVal==='99+'?'vux-avatar-badge val':'vux-avatar-badge ']">{{
          badgeVal
        }}</span>
    </div>
    <div v-if="type.includes('icon')">
              <span :class="[size,shape]" class="text-avatar">
             <i class="iconfont icon-apps"></i>
            </span>
      <span v-if="badge||badge===0" :class="[badgeVal>0?'vux-avatar-badge val':'vux-avatar-badge']">{{
          badgeVal
        }}</span>
    </div>
  </div>
</template>
<script>
const sizes = ['normal', 'small', "large"]
const shapes = ['round', 'square']
const types = ['image', 'text', 'icon']
export default {
  name: "VuxAvatar",
  data() {
    return {}
  },
  computed: {
    avatarText() {
      return this.text.charAt(0)
    },
    badgeVal() {
      if (this.badge) {
        return this.badge > 100 ? '99+' : this.badge
      } else {
        return ''
      }
    }

  },
  props: {
    // 头像类型,默认图片
    type: {
      type: String,
      default: 'image',
      validator(val) {
        return types.includes(val);
      },
    },
    //头像组
    group: {
      type: Boolean,
      default: false
    },
    // small、normal、large
    size: {
      type: String,
      default: 'normal'
    },
    // square、round
    //默认圆的
    // square
    shape: {
      type: String,
      default: "round",
      validator(val) {
        return shapes.includes(val);
      },
    },
    //头像背景颜色
    bgColor: {
      type: String,
      default: ''
    },
    //图片地址
    src: {
      type: String,
      default: ''
    },
    //文字颜色
    textColor: {},
    text: {
      type: String,
      default: '全'
    },
    badge: {
      type: Number,
    },

  }
}
</script>

<style lang="less" scoped>
.vux-avatar {
  position: relative;
  display: inline-block;

  .vux-avatar-badge {
    border-radius: 12px;
    position: absolute;
    top: 0;
    right: -10px;
    background: linear-gradient(135deg, #fa2c19 0%, #fa6419 100%);
    text-align: center;
    font-size: 12px;
    line-height: 12px;
    color: #fff;

    &.val {
      padding: 0 5px;
    }

    &.null {
      width: 12px;
      height: 12px;
    }
  }

  .image-avatar {
    display: block;
    border-radius: 50%;
    object-fit: cover;

    &.normal {
      width: 48px;
      height: 48px;

      &.square {
        border-radius: 4px;
      }
    }

    &.small {
      width: 36px;
      height: 36px;

      &.square {
        border-radius: 4px;
      }
    }

    &.large {
      width: 54px;
      height: 54px;

      &.square {
        border-radius: 4px;
      }
    }

  }

  .text-avatar {
    display: inline-block;
    text-align: center;
    background-color: rgb(238, 238, 238);;
    color: rgb(102, 102, 102);
    border-radius: 50%;

    &.normal {
      width: 48px;
      height: 48px;
      line-height: 48px;
      font-size: 16px;

      &.square {
        border-radius: 4px;
      }
    }

    &.small {
      width: 30px;
      height: 30px;
      line-height: 30px;
      font-size: 13px;

      &.square {
        border-radius: 4px;
      }
    }

    &.large {
      width: 54px;
      height: 54px;
      line-height: 54px;
      font-size: 18px;

      &.square {
        border-radius: 4px;
      }
    }

  }

}

</style>

