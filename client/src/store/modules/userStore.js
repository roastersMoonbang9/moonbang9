const userStore = {
    namespaced: true,
    state: {
        id: '',
        mem_no: '',
        name: '',
        token: '',
        isLogin: false,
        kakaoInfo: {},
    },

    mutations: {
        user(state, payload) {
            state.id = payload.id;
            state.isLogin = payload.isLogin;
            state.mem_no = payload.mem_no;
            state.name = payload.name;
            state.token = payload.token;
        },
        logout(state) {
            state.id = '';
            state.mem_no = '';
            state.name = '';
            state.token = '';
            state.isLogin = false;
        }
    },
    actions: {

    }
}

export default userStore;