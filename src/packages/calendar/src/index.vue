<template>
  <vux-popup :popup-style="{height:'80%'}" :show.sync="curOpen" round>
    <div class="vux-calendar">
      <div class="vux-calendar-container">
        <div>
          <span v-if="y === year && m === month">日期选择 </span>
          <vux-tag v-else :type="theme" round
                   @click="reset()">回到今天
          </vux-tag>
        </div>
      </div>
      <div class="select-year-month">
        <span v-if="!disabledYear" @click="switchYearDate('left')">
          <ArrowLeft></ArrowLeft>
        </span>
        <span @click="switchMonthDate('left')"> <ArrowLeft></ArrowLeft></span>
        <div @click="reset()">{{ y }}年{{ m }}月
        </div>
        <span @click="switchMonthDate('right')"> <arrow-right></arrow-right></span>
        <span v-if="!disabledYear" @click="switchYearDate('right')"><arrow-right></arrow-right></span>
      </div>
      <ul class="week-container">
        <li v-for="(item,index) in weeks" :key="index"
        >{{ item }}
        </li>
      </ul>
      <div>
        <div v-touch:swipeleft="leftSlide" v-touch:swiperight="rightSlide" class="calender-content ">
          <div v-for="item in calendarArr" :class="[theme,dateItemByStyle(item)]" class="calender-item">
              <span v-if="showOtherMonthDate" :class="[theme,isOtherMonthStyle(item)]"
                    @click="handleSelectData(item.date,item)">
                  {{ item.d }}</span>
            <span v-if="!showOtherMonthDate" :class="[theme,
                            isOtherMonthStyle(item)
                     ]"
                  @click="handleSelectData(item.date,item)">
                  {{ item.isOtherMonth ? "" : item.d }}</span>
            <div v-if="showOtherMonthDate" :class="[ theme,
                            isOtherMonthStyle(item),
                            item.Term?'default-text':''
                     ]" class="small-font">
              {{ item.Term ? item.Term : item.IDayCn }}
            </div>
            <div v-if="!showOtherMonthDate" :class="[
                           isOtherMonthStyle(item)
                ]" class="small-font">
              {{
                item.isOtherMonth ? '' : item.IDayCn
              }}
            </div>
            <p v-if="item.date&&item.date===rangeDateList[0]" class="small-font">
              {{ startText }}
            </p>
            <p v-if="item.date&&item.date===rangeDateList[1]" class="small-font">
              {{ endText }}
            </p>
            <p v-if="customText&&customText.length" class="small-font">
              {{ customText }}
            </p>
            <div v-if="showHolidays"
                 :class="[theme,showHolidays?'default-text':'']"
                 class="small-font">{{
                getHolidays(`${item.m}${item.d}`)
              }}
            </div>
          </div>
        </div>
        <div class="month-watermark"
        >
          {{ m }}
        </div>
      </div>
      <p v-if="type==='single'&&singleDate&&showDatePrompt" class="select-tip-date">
        {{ singleDate.length > 0 ? singleDate : '' }}</p>
      <p v-if="type==='range'&&rangeDateList.length===2&&showDatePrompt"
         class="select-tip-date">{{ rangeDateList[0] }}至{{
          rangeDateList[1]
        }}</p>

      <div class="confirm-button">
        <div style="display: flex;align-items: center;width: 100%">
          <vux-space size="12">
            <vux-button
                v-if="singleDate.length||rangeDateList.length||multipleDateList.length"
                :type="theme"
                block
                plain round @click="clearDate">
              清空
            </vux-button>
            <vux-button
                v-else
                :type="theme"
                bg-color="#f5f7fa"
                block
                no-border
                plain round @click="handleClose">
              取消
            </vux-button>
            <vux-button
                v-if="showConfirm"
                :disabled="confirmTextByRange"
                :type="theme" block
                round @click="handleConfirm">
              {{ confirmTextByRange ? `请选择${endText}时间` : confirmText }}
            </vux-button>
          </vux-space>
        </div>
      </div>
    </div>
  </vux-popup>
</template>

<script>

import calendar from "./calendar.js";
import {dateFormat, daysFromNow, getCountDayByDate, getRangeDates, makeUpForZero} from "./date-utils.js";
import VuxPopup from "@/packages/popup/index.vue";
import VuxTag from "@/packages/tag/src/index.vue";
import VuxButton from "@/packages/button/src/index.vue";
import VuxSpace from "@/packages/space/src/index.vue";
import ArrowLeft from "@/components/ArrowLeft.vue";
import ArrowRight from "@/components/ArrowRight.vue";

const SECONDS_PER_DAY = 24 * 60 * 60;
export default {
  name: "VuxCalendar",
  components: {ArrowRight, ArrowLeft, VuxSpace, VuxButton, VuxTag, VuxPopup},
  data() {
    return {
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      curOpen: this.open,
      y: '',
      m: '',
      d: "",
      calendarArr: [],
      //单选
      singleDate: '',
      //开始  结束   住店   离店
      rangeDateList: [],
      // 以及  多选时间
      multipleDateList: [],
      rangeDateListByStyle: [],
    };
  },
  model: {
    prop: 'open',
  },
  props: {
    customText: {
      type: [Number, String]
    },
    open: {
      type: Boolean,
    },
    //回显数据
    value: {
      type: [Array, String]
    },
    //表示选择单个日期
    //表示选择多个日期
    //表示选择日期区间
    type: {
      type: String,
      default: 'single',
      validator(val) {
        return ["single", "multiple", 'range'].includes(val);
      },

    },
    theme: {
      type: String,
      default: 'primary',
      validator(val) {
        return ["primary", "danger"].includes(val);
      },
    },
    minDate: {
      type: Date,
    },
    maxDate: {
      type: Date
    },
    //日期提示
    showDatePrompt: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    //确认按钮文字
    confirmText: {
      type: String,
      default: '确认'
    },
    //默认选择日期
    defaultData: {
      type: [Date, null],
    },
    //是否显示日
    showHolidays: {
      type: Boolean,
      default: false
    },
    startText: {
      type: String,
      default: '开始'
    },
    endText: {
      type: String,
      default: '结束'
    },
    //禁用选择年的操作
    disabledYear: {
      type: Boolean,
      default: false
    },
    //显示关闭按钮
    closable: {
      type: Boolean,
      default: true
    },
    //任意时期可选
    anyDateOptional: {
      type: Boolean,
      default: true
    },
    //开始日期和结束日期可以同一天
    startDateEqualsEndDate: {
      type: Boolean,
      default: true
    },
    //显示今天
    showToday: {
      type: Boolean,
      default: false
    },
    //显示上一个月日期和下一个月日期
    showOtherMonthDate: {
      type: Boolean,
      default: false
    },
    //是否显示农历
    showLunar: {
      type: Boolean,
      default: false,

    },
    maxRange: {
      type: Number,
    }

  },
  computed: {
    year() {
      return new Date().getFullYear()
    },
    month() {
      return makeUpForZero(new Date().getMonth() + 1)
    },
    day() {
      return new Date().getDate()
    },
    confirmTextByRange() {
      return this.type === 'range' && this.rangeDateList.length === 1
    },
    caleClass() {
      return [
        this.showMark ? 'drawer-mask' : '',
        this.placement,
        {
          'is-open': this.curOpen,
          'is-close': !this.curOpen
        }
      ]
    },

    heightByStyle() {
      if (parseInt(this.height) <= 100) {
        return this.height + '%'
      } else {
        return '80%'
      }
    },
  },
  mounted() {
    this.getTodayDate();
    this.getCalendar()
  },
  created() {
    this.screenWidth = window.innerWidth
    this.dateEcho();
  },
  activated() {
    this.dateEcho();
  },
  watch: {
    y() {
      this.getCalendar()
    },
    m() {
      this.getCalendar()
    },
    open(val) {
      this.curOpen = val;
    },
    curOpen(val) {
      this.$emit('input', val)
    }
  },

  methods: {
    isOtherMonthStyle(item) {
      if (!this.anyDateOptional && item.date < dateFormat(new Date()) || item.isOtherMonth)
        return 'past-time-active '
    },
    dateItemByStyle(item) {
      const {singleDate, rangeDateList, rangeDateListByStyle, type, multipleDateList} = this;
      if (type === 'single' && item.date === singleDate || type === 'range' && rangeDateList.some(it => it === item.date) || type === 'multiple' && multipleDateList.some(it => it === item.date)) {
        return 'selectActive'
      }
      if (type === 'range' && rangeDateListByStyle.some(it => it === item.date)) {
        return 'rangeActive'
      }
      if (["single", "multiple", 'range'].includes(type) && dateFormat(new Date()) === item.date) {
        return 'todayActive'
      }
    },
    handleClose() {
      this.curOpen = false;
    },
    leftSlide() {
      this.switchMonthDate('right');
    },
    rightSlide() {
      this.switchMonthDate('left');
    },
    closeMaskHandle(e) {
      if (e.target !== this.$el) {
        return;
      }
      this.handleClose();
    },
    resetDate() {
      this.singleDate = '';
      this.multipleDateList = [];
      this.rangeDateList = [];
      this.rangeDateListByStyle = [];
    },
    reset() {
      this.resetDate()
      this.getTodayDate();
      this.getCalendar()
    },

    clearDate() {
      this.resetDate();
      this.handleResetDate()
    },
    handleResetDate() {
      this.$emit('reset')
    },
    handleSelectData(item, dateItem) {
      if (this.readonly) {
        return;
      }
      let selectTime = new Date(item).getTime();
      const toDay = dateFormat(new Date());
      const toDayTime = new Date(toDay).getTime();
      const optionalDate = (startDate, endDate) => {
        if (startDate < endDate && !this.anyDateOptional) {
          this.$msg.warning('该日期暂不可选')
          return false;
        }
        return true;
      }
      const pinkDate = () => {
        if (dateItem.type === 'next' && dateItem.isOtherMonth) {
          this.switchMonthDate('right');
        }
        if (dateItem.type === 'prev' && dateItem.isOtherMonth) {
          this.switchMonthDate('left');
        }
      }
      let type = this.type;
      switch (type) {
        case 'single':
          if (!optionalDate(selectTime, toDayTime)) {
            return;
          }
          pinkDate()
          this.singleDate = item;
          break;
        case 'multiple':
          if (!optionalDate(selectTime, toDayTime)) {
            return;
          }
          pinkDate()
          if (this.maxRange && this.multipleDateList.length === this.maxRange) {
            return this.$msg.info(`最多选择${this.maxRange}天`)
          }
          this.handleTypeByMultiple(item);
          break;
        case 'range':

          if (!optionalDate(selectTime, toDayTime)) {
            return;
          }
          //已有第一个日期   点击第二个日期如果是下一月的日期也不跳转了
          if (!this.confirmTextByRange) {
            pinkDate()
          }
          this.handleTypeByRange(item);
          if (this.rangeDateList.length === 2 && this.maxRange) {
            //加一把当天日期也算上
            const countDay = getCountDayByDate(this.rangeDateList[0], this.rangeDateList[1]) + 1;
            if (countDay > this.maxRange) {
              this.rangeDateList = [this.rangeDateList[0], daysFromNow(this.maxRange - 1, this.rangeDateList[0])]
              this.rangeDateListByStyle = getRangeDates(this.rangeDateList[0], this.rangeDateList[1]);
              return this.$msg.info(`最多选择${this.maxRange}天`)
            }
          }


          break;
        default:
          break;
      }

    },
    handleTypeByMultiple(item) {
      if (!this.multipleDateList.includes(item)) {
        this.multipleDateList.push(item)
      } else {
        this.multipleDateList = this.multipleDateList.filter(it => it !== item)
      }
    },
    handleTypeByRange(item) {
      //this.startDateEqualsEndDate
      // 开始日期可以等于结束日期
      // else if (this.rangeDateList.length === 1 && this.rangeDateList[0] == item) {
      //     this.rangeDateList = [];
      //   }
      if (!this.rangeDateList.includes(item) || this.startDateEqualsEndDate) {
        this.rangeDateList.push(item)
      } else {
        //点击结束变为开始
        this.rangeDateList = this.rangeDateList.filter(it => it === item)
        //下面逻辑也没问题  体验不一样
        // this.rangeDateList = this.rangeDateList.filter(it => it !== item)
      }
      if (this.rangeDateList.length === 3) {
        this.rangeDateList = this.rangeDateList.splice(2, 3);
      }
      if (this.rangeDateList[1] < this.rangeDateList[0]) {
        // const tempDate = this.rangeDateList[1];
        // this.rangeDateList = []
        // this.rangeDateList.push(tempDate);
        this.rangeDateList = this.rangeDateList.splice(1, 2)
      }
      if (this.rangeDateList.length === 2) {
        const day = getCountDayByDate(this.rangeDateList[0], this.rangeDateList[1])
        if (day >= 2) {
          this.rangeDateListByStyle = getRangeDates(this.rangeDateList[0], this.rangeDateList[1]);
        }
      } else {
        this.rangeDateListByStyle = [];
      }
    },

    getTodayDate() {
      if (this.maxDate || this.minDate) {
        this.getCurrentDate(this.maxDate)
      } else {
        let curDate = new Date();
        this.getCurrentDate(curDate)
      }
    },
    getCurrentDate(date) {
      this.y = date.getFullYear();
      let m = date.getMonth() + 1;
      this.m = makeUpForZero(m);
      let d = date.getDate();
      this.d = makeUpForZero(d);
    },

    // 切换月份
    switchMonthDate(type) {
      if (this.minDate || this.maxDate) {
        let maxDateByYear = this.maxDate.getFullYear();
        let minDateByYear = this.minDate.getFullYear();
        let maxDateByMonth = makeUpForZero(this.maxDate.getMonth() + 1);
        let minDateByMonth = makeUpForZero(this.minDate.getMonth() + 1);
        switch (type) {
            //小
          case 'left':
            if (this.m > 1) {
              this.m = makeUpForZero(this.m - 1);
            } else if (this.y <= minDateByYear) {
              this.y = minDateByYear;
              this.m = minDateByMonth;
            } else {
              this.y -= 1;
              this.m = 12;
            }

            break;
          case 'right':
            //大
            if (Number(this.y) === Number(maxDateByYear) && Number(this.m) === Number(maxDateByMonth)) {
              this.m = maxDateByMonth;
              return
            }
            if (this.m < 12) {
              this.m = makeUpForZero(parseInt(this.m) + 1);
            } else if (this.y >= maxDateByYear) {
              this.y = maxDateByYear;
            } else {
              this.y = makeUpForZero(parseInt(this.y) + 1);
              this.m = 1;
            }
            break;
        }

      } else {
        switch (type) {
            //小
          case 'left':
            if (this.m > 1) {
              this.m = makeUpForZero(this.m - 1);
            } else {
              this.y -= 1;
              this.m = 12;
            }
            break;
          case 'right':
            //大
            if (this.m < 12) {
              this.m = makeUpForZero(parseInt(this.m) + 1);
            } else {
              this.y = makeUpForZero(parseInt(this.y) + 1);
              this.m = 1;
            }
            break;
        }
      }
    },
    switchYearDate(type) {
      if (this.minDate || this.maxDate) {
        let maxDateByYear = this.maxDate.getFullYear();
        let minDateByYear = this.minDate.getFullYear();
        switch (type) {
          case 'left':
            if (this.y < minDateByYear) {
              this.y -= 1;
            }
            break;

          case 'right':
            if (maxDateByYear > this.y) {
              this.y += 1;
            }
            break;
        }
      } else {
        switch (type) {
          case 'left':
            if (this.y > 1970) {
              this.y -= 1;
            }
            break;

          case 'right':
            if (this.y > 1970) {
              this.y += 1;
            }
            break;
        }
      }


    },
    handleConfirm() {
      let type = this.type;
      switch (type) {
        case 'single':
          this.handleEmit(this.singleDate)
          this.handleClose();
          break;
        case 'multiple':
          //多选时间先将日期进行排序在进行返回
          const multipleDateList = this.multipleDateList.sort((a, b) => {
            return new Date(a).getTime() - new Date(b).getTime()
          })
          this.handleEmit(multipleDateList)
          this.handleClose();
          break;
        case 'range':
          this.handleEmit(this.rangeDateList)
          this.handleClose();
          break;
        default:
          break;
      }
    },
    handleEmit(data) {
      this.$emit('confirm', data);
      this.$emit('change', data);
    },
    dateEcho() {
      if (this.value) {
        switch (this.type) {
          case 'range':
            //保存一份不要直接修改
            let rangeDateDefault = this.value.filter(Boolean);
            if (!rangeDateDefault.length) {
              const toDayDate = daysFromNow(0)
              const tomorrowSDate = daysFromNow(1)
              this.rangeDateList = [toDayDate, tomorrowSDate];
              this.rangeDateListByStyle = getRangeDates(toDayDate, tomorrowSDate);
            } else {
              this.rangeDateList = rangeDateDefault;
              this.rangeDateListByStyle = getRangeDates(rangeDateDefault[0], rangeDateDefault[1]);
            }

            break;
          case 'multiple':
            let multipleDateDefault = this.value.filter(Boolean);
            if (!multipleDateDefault.length) {
              let res = []
              for (let i = 0; i < 7; i++) {
                res.push(dateFormat(new Date().getTime() + SECONDS_PER_DAY * 1000 * i))
              }
              this.multipleDateList = res;
            } else {
              this.multipleDateList = multipleDateDefault
            }
            break;
          case 'single':
            if (isNaN(this.value) && !isNaN(Date.parse(this.value))) {
              this.singleDate = this.value;
            } else {
              this.singleDate = dateFormat(new Date());
            }
            break;
        }
      }
    },
    isNextPrevDate(item) {
      let y = item.getFullYear();
      let m = Number(makeUpForZero(item.getMonth() + 1));
      let type;
      if (this.y === y && Number(this.m) > Number(m)) {
        type = 'prev'
      } else if (this.y === y && Number(this.m) < Number(m)) {
        type = 'next'
      } else if (this.y === y && Number(this.m) == m) {
        type = 'current'
      }
      if (this.y > y && m == "12") {
        type = 'prev'
      }
      if (this.y < y && m == "01") {
        type = 'next'
      }
      return type
    },
    getCalendar() {
      let it = new Date(this.y, this.m, 0);
      let calendars = [];
      it.setDate(1)
      it.setDate(it.getDate() - ((it.getDay() === 0 ? 0 : it.getDay()))) //偏移量
      for (let i = 0; i < 42; i++) {
        let createDate = {
          date: new Date(it),
          d: it.getDate(),
        }
        calendars.push(Object.assign(createDate, {}))
        it.setDate(it.getDate() + 1)
      }
      this.calendarArr = calendars.map(item => {
        return {
          y: new Date(item.date).getFullYear(),
          m: makeUpForZero(new Date(item.date).getMonth() + 1),
          d: makeUpForZero(item.d),
          week: this.weeks[new Date(item.date).getDay()],
          date: dateFormat(item.date),
          isOtherMonth: Number(makeUpForZero(new Date(item.date).getMonth() + 1)) !== Number(this.m),
          type: this.isNextPrevDate(item.date)

        }
      })
      if (this.showLunar) {
        this.calendarArr = this.calendarArr.map(item => {
          let lunar = calendar.solar2lunar(Number(item.y), Number(item.m), Number(item.d));
          return {
            ...item,
            ...lunar
          }
        })
      }
      return this.calendarArr
    },
  },


};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  text-align: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.vux-calendar {
  .vux-calendar-container {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
  }

  .calender-content {
    overflow-y: auto;
    height: 360px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    align-items: center;
    padding: 0 2px;
    box-sizing: border-box;
    transition: all 0.5s linear;
  }

  .transition {
    transition: all 0.5s linear;
  }

  .calender-item {
    font-weight: 500;
    text-align: center;
    height: 60px;
    display: flex;
    justify-content: center;
    align-self: center;
    //align-content: center;
    flex-direction: column;
    box-sizing: border-box;


  }

  .past-time-active {
    color: #999999;
  }

  .back-to-today {
    border-radius: 20px;
    width: 100%;
    padding: 0 16px;
    text-align: center;
    display: inline-block;

  }


  .month-watermark {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 128px;
    transform: translate(-50%, -50%);
    z-index: -1;
    color: #e6e6e6;
    opacity: 0.3;
  }

  .select-tip-date {
    text-align: center;
    font-size: 13px;
    color: #606266;
  }

  .week-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: 0 2px;
  }

  .confirm-button {
    box-sizing: border-box;
    padding: 8px 10px;
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffff;
  }

  .todayActive, .default-text {

    &.primary {
      color: #1989fa;
    }

    &.danger {
      color: #ff4040;
    }
  }

  .rangeActive {

    &.danger {
      background-color: #FBEBEA;
      color: #ff4040;
    }

    &.primary {
      background-color: #ecf5ff;
      color: #1989fa;
    }
  }

  .selectActive {
    border-radius: 2px;
    color: #fff !important;

    .past-time-active {
      color: #fff !important;
    }

    &.danger {
      background: #ff4040 !important;

    }

    &.primary {
      background: #1989fa !important;
    }
  }

  .select-year-month {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 8px 0;
    padding: 0 60px;
    box-sizing: border-box;
  }

  .small-font {
    font-size: 12px;
    transform: scale(83.3%);
  }
}

</style>
