export default {
    setId (context, orderId) {
        context.commit('SET_ID', orderId)
    },
    setModel(context, model) {
        context.commit('MODEL', model)
    },
}


