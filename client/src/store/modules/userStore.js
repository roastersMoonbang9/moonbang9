const userStore = {
    namespaced: true,
    state: {
        id: '',
        mem_no: '',
        name: '',
        token: '',
        isLogin: false,
        kakaoInfo: {},
        mem_status: ''
    },

    mutations: {
        user(state, payload) {
            state.id = payload.id;
            state.isLogin = payload.isLogin;
            state.mem_no = payload.mem_no;
            state.name = payload.name;
            state.token = payload.token;
            state.mem_status = payload.mem_status;
        },
        logout(state) {
            state.id = '';
            state.mem_no = '';
            state.name = '';
            state.token = '';
            state.isLogin = false;
            state.mem_status = '';
        }
    },
    actions: {

    }
}

export default userStore;