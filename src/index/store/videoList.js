export default {
    namespaced: true,
    state: {
        currentPageNum: 1
    },
    getters: {
        currentPageNum: (state) => {
            return  state.currentPageNum
        },
    },
    mutations: {
        setCurrentPageNum: (state, value) => {
            state.currentPageNum = value
        }
    },
    actions: {},
}
    