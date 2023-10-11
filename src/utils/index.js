export const debounce = (func, delay) => {
    let timeoutId;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

export function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function () {
        const context = this;
        const args = arguments;
        const currentTime = new Date().getTime();
        const timeSinceLastExec = currentTime - lastExecTime;
        if (timeSinceLastExec > delay) {
            lastExecTime = currentTime;
            func.apply(context, args);
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                lastExecTime = currentTime;
                func.apply(context, args);
            }, delay - timeSinceLastExec);
        }
    };
}

export function bigNumAdd(num1, num2) {
    const num1Digits = (num1.toString().split('.')[1] || '').length;
    const num2Digits = (num2.toString().split('.')[1] || '').length;
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
}
