export default {
    SET_ID (state, orderId) {
        state.orderId = orderId
        sessionStorage.setItem('id', JSON.stringify(orderId))
    },
    MODEL (state, model) {
        state.model = model
        sessionStorage.setItem('model', JSON.stringify(model))
    },
}


