<template>
  <div class="search-container">
    <div :class="{'icon-placeholder-left':isFocus||noEmpty}" class="search-input gary">
      <img alt="搜索" class="search-icon" src="../../../assets/search.svg"/>
      <input v-model="searchVal"
             placeholder="搜索"
             type="text"
             @blur="handleBlur"
             @focus="handleFocus"
             @keyup.enter="handleSearchEnter"
      />
      <img v-show="noEmpty" alt="取消" class="reset-icon" src="../../../assets/cancel.svg"
           @mousedown="handleResetSearch"/>
    </div>
    <!--    v-show="noEmpty&&isFocus"v-show="noEmpty&&isFocus"-->
    <div class="search-btn-group">
      <!--           尽量不要使用button标签 -->
      <span class="search-btn" @mousedown="handleSearch">搜索</span>
      <span @mousedown="handleCancel">取消</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "VuxSearch",
  data() {
    return {
      isFocus: false,
      searchVal: '',
    }
  },
  computed: {
    noEmpty() {
      return this.searchVal.length > 0
    },
    val() {
      return this.searchVal
    }
  },
  watch: {
    val(n, v) {
      if (n !== v) {
        this.emitOnChange(n, v)
      }
    }
  },
  methods: {
    //聚焦
    handleFocus() {

      this.isFocus = true;
    },
    //失焦
    handleBlur() {
      this.isFocus = false;
    },
    handleResetSearch(e) {
      e.preventDefault();
      this.searchVal = ''
    },
    handleCancel(e) {
      // e.preventDefault();
      this.searchVal = '';
      this.emitOnSearch();
    },
    handleSearch() {
      this.emitOnSearch();
    },
    handleSearchEnter(e) {
      e.preventDefault();
      this.emitOnpressEnter();
      this.emitOnSearch();
    },
    emitOnSearch() {
      this.$emit('on-search', this.searchVal)
    },
    emitOnpressEnter() {
      this.$emit('on-press-enter', this.searchVal);
    },
    emitOnChange(n, v) {
      this.$emit('on-change', n, v)
    }
  }
}
</script>
<style lang="less">
@color-input-search-bg-gray: #f5f6fa;
@color-input-search-bg-light: #ffffff;
@color-input-placeholder: #c5ccdb;
@color-input: #262d3d;
@color-btn-default: #78849e;
@color-btn-primary: #4a70ff;
body {
  font-family: PingFangSC, sans-serif;
  font-size: 14px;

}

.search-container {
  background-color: #71BD90;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 32px;

  .search-btn-group {

    .search-btn {
      display: inline-block;
      margin: 0 8px;
      width: 32px;
      line-height: 22px;
      //color: @color-btn-primary;
    }

  }

  .search-input {
    background-color: #F7F8FA;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
    border-radius: 18px;
    box-sizing: border-box;
    flex: 1;
    transition: all 0.5s ease-in-out;

    .search-icon {
      transition: all 0.5s ease-in-out;
      position: absolute;
      left: ~'calc(50% - 32px)';
      width: 20px;
      height: 20px;
    }

    .reset-icon {
      width: 20px;
      height: 20px;
      color: #d9d9d9;
    }

    &.gary {
      background: @color-input-search-bg-gray;
    }


    &.icon-placeholder-left {
      .search-icon {
        left: 5px !important;
      }

      input {
        margin-left: 19px !important;
        //caret-color: @color-btn-primary !important;

        &::placeholder {
          text-align: left !important;
        }

        &::-ms-input-placeholder {
          text-align: left !important;
        }

        &::-webkit-input-placeholder {
          text-align: left !important;
        }
      }
    }

    input {
      /*设置为透明颜色*/
      //background: transparent;
      background: #F7F8FA;
      border-radius: 18px;
      //border-radius: 16px;
      margin-left: 4px;
      height: 32px;

      width: 100%;
      line-height: 32px;
      font-size: 14px;
      color: @color-input;
      border: 0;
      outline: none;
      flex: 1;

      &::placeholder {
        font-size: 14px;
        font-family: PingFangSC, sans-serif;
        text-align: center;
        color: @color-input-placeholder;
      }

      &::-ms-input-placeholder {
        font-size: 14px;
        font-family: PingFangSC, sans-serif;
        text-align: center;
        color: @color-input-placeholder;
      }

      &::-webkit-input-placeholder {
        font-size: 14px;
        font-family: PingFangSC, sans-serif;
        text-align: center;
        color: @color-input-placeholder;
      }

      input:placeholder-shown {
        font-size: 14px;
      }

    }
  }


}
</style>
