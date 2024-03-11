// userStore.js

const userStore = {
    namespaced: true,
    state: {
        id: '',
        mem_no: '',
        name: '',
        token: '',
        isLogin: false,
        mem_status: '',
        email: '',
        phone :'',
        addr:'',
        addrdt:'',
        post_cd:'',
        birth_dt:null
    },

    mutations: {
        user(state, payload) {
            state.id = payload.id;
            state.isLogin = payload.isLogin;
            state.mem_no = payload.mem_no;
            state.name = payload.name;
            state.token = payload.token;
            state.mem_status = payload.mem_status;
            state.email = payload.email;
            state.phone = payload.phone;
            state.addr = payload.addr;
            state.addrdt = payload.addrdt;
            state.post_cd = payload.post_cd;
            state.birth_dt = payload.birth_dt;
        },
        logout(state) {
            state.id = '';
            state.mem_no = '';
            state.name = '';
            state.token = '';
            state.isLogin = false;
            state.mem_status = '';
            state.email = '';
            state.phone = '';
            state.addr = '';
            state.addrdt = '';
            state.post_cd = '';
            state.birth_dt = '';
        }
    },
    actions: {

    }
}

export default userStore;