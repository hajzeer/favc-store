export default {
    SET_ID (state, orderId) {
        state.orderId = orderId
        localStorage.setItem('id', JSON.stringify(orderId))
    },
    MODEL (state, model) {
        state.model = model
        localStorage.setItem('model', JSON.stringify(model))
    },
}


