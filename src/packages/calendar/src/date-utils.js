//时间增加 减少相应天数
export const daysFromNow = (n, date = dateFormat(new Date())) => {
    let d = new Date(date);
    d.setDate(d.getDate() + Math.abs(n));
    return dateFormat(d);

};


export const makeUpForZero = (num) => {
    if (num < 10) {
        return `0${num}`;
    }
    return num;
}
export const dateFormat = (timestamp, formats) => {
    // formats格式包括
    // 1. Y-m-d
    // 2. Y-m-d H:i:s
    // 3. Y年m月d日
    // 4. Y年m月d日 H时i分
    formats = formats || 'Y-m-d';
    // const zero = function (value) {
    //   if (value < 10) {
    //     return '0' + value;
    //   }
    //   return value;
    // };

    var date = timestamp ? new Date(timestamp) : new Date();
    var year = date.getFullYear();
    var month = makeUpForZero(date.getMonth() + 1);
    var day = makeUpForZero(date.getDate());
    var hour = makeUpForZero(date.getHours());
    var minute = makeUpForZero(date.getMinutes());
    var second = makeUpForZero(date.getSeconds());
    return formats.replace(/[YmdHis]/ig, function (matches) {
        return ({
            Y: year, m: month, d: day, H: hour, i: minute, s: second
        })[matches];
    });
}
export const getHoliday = (strDate) => {
    const Holidays = {
        "0101": "元旦",
        "0214": "情人",
        "0308": "妇女",
        "0312": "植树",
        "0401": " 愚人",
        "0501": " 劳动",
        "0504": " 青年",
        "0512": "护士",
        "0601": " 儿童",
        "0701": "建党",
        "0801": "建军",
        "0910": "教师",
        "1001": "国庆",
        "1224": "平安夜",
        "1225": " 圣诞"
    };
    return Holidays[strDate] || ''
}
//根据两个日期获取日期范围
export const getRangeDates = (startDate, endDate) => {
    const dates = [];
    let result = [];
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
    const day = Math.abs(endTime - startTime) / (24 * 60 * 60 * 1000)
    for (let i = 1; i < Math.abs(day); i++) {
        dates.push(startTime + 24 * 60 * 60 * 1000 * i)
    }
    dates.forEach(item => {
        result.push(dateFormat(item))
    })
    return result
}
export const getCountDayByDate = (start, end) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    return Math.abs(endTime - startTime) / (24 * 60 * 60 * 1000)
}
export const isWorkday = (date) => {
    const now = !date ? new Date() : new Date(date);
    const getaway = now.getDay();
    return getaway === 0 || getaway === 6;
}
