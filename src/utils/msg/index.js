import Message from "@/packages/message";

const msg = {

    success(message) {
        Message({
            message: message, type: 'success', duration: 500
        })
    },
    error(message) {
        Message({
            message: message, type: 'error', duration: 2000
        })
    },
    info(message) {
        Message({
            message: message, type: 'info', duration: 1000
        })
    },
    warning(message) {
        Message({
            message: message, type: 'warning', duration: 3000
        })
    },
}

export default msg;
