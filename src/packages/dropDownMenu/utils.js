const isWindow = (val) => {
    return val === window;
}

const makeDOMRect = (width, height) =>


    ({
        top: 0, left: 0, right: width, bottom: height, width, height,
    });
// {
//   "x": 0,
//   "y": 108,
//   "width": 360,
//   "height": 48,
//   "top": 108,
//   "right": 360,
//   "bottom": 156,
//   "left": 0
// }

export const useRect = (element) => {

    if (isWindow(element)) {
        const width = element.innerWidth;
        const height = element.innerHeight;
        return makeDOMRect(width, height);
    }

    if (element && element.getBoundingClientRect) {
        return element.getBoundingClientRect();
    } else {
        return makeDOMRect(0, 0);

    }

};
