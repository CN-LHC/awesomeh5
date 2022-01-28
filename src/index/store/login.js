export default {
    namespaced: true,
    state: {
        userInfo: {}
    },
    getters: {
        userInfo: (state) => {
            return  state.userInfo
        },
    },
    mutations: {
        setInfo: (state, value) => {
            state.userInfo = value
        }
    },
    actions: {},
}
    