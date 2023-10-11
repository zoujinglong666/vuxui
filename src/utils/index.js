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
