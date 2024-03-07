const userStore = {
    namespaced: true,
    state: {
        id: "",
        isLogin: false,
        mem_no:'',
        name:''
    },
    mutations: {
        user(state, payload) {
            state.id = payload.id;
            state.isLogin = payload.isLogin;
            state.mem_no = payload.mem_no;
            state.name = payload.name;
          }
    },
    actions: {
        
    }
}

export default userStore