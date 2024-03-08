<!-- loginView.vue -->

<template>
  <!-- HTML 코드를 포함 -->
  <div class="login">
    <head>
      <meta charset="utf-8" />
      <title>DASHMIN - Bootstrap Admin Template</title>
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta content="" name="keywords" />
      <meta content="" name="description" />

      <!-- Favicon -->
      <link href="img/favicon.ico" rel="icon" />

      <!-- Google Web Fonts -->
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <!-- Icon Font Stylesheet -->
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
        rel="stylesheet"
      />

      <!-- Libraries Stylesheet -->
      <link
        href="lib/owlcarousel/assets/owl.carousel.min.css"
        rel="stylesheet"
      />
      <link
        href="lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css"
        rel="stylesheet"
      />

      <!-- Customized Bootstrap Stylesheet -->
      <link href="css/bootstrap.min.css" rel="stylesheet" />

      <!-- Template Stylesheet -->
      <link href="css/style.css" rel="stylesheet" />
    </head>
    <body>
      <div class="container-xxl position-relative bg-white d-flex p-0">
        <!-- Sign In Start -->
        <div class="container-fluid">
          <div
            class="row h-100 align-items-center justify-content-center"
            style="min-height: 100vh"
          >
            <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
              <div class="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                <div
                  class="d-flex align-items-center justify-content-between mb-3"
                >
                  <a href="index.html" class="">
                    <h3 class="text-primary">
                      <i class="fa fa-hashtag me-2"></i>문방구
                    </h3>
                  </a>
                  <h3>로그인</h3>
                </div>

                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    v-model="id"
                  />
                  <label for="floatingInput">아이디</label>
                </div>
                <div class="form-floating mb-4">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    v-model="pwd"
                  />
                  <label for="floatingPassword">비밀번호</label>
                </div>
                <div
                  class="d-flex align-items-center justify-content-between mb-4"
                >
                  <a href="#" data-bs-toggle="modal" data-bs-target="#findModal"
                    >아이디/비밀번호 찾기</a
                  >
                </div>

                <button
                  type="submit"
                  class="btn btn-primary py-3 w-100 mb-4"
                  @click="login()"
                >
                  로그인
                </button>
                <div>
                  <a id="custom-login-btn" @click="kakaoLogin()">
                    <img
                      src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                      width="222"
                      alt="카카오 로그인 버튼"
                    />
                  </a>
                </div>
                <p class="text-center mb-0">
                  아직 문방구 회원이 아니신가요? <br />
                  <a href="/userJoin">회원가입하기</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Sign In End -->
        
        <!-- 모달 창 -->
        <div
          class="modal fade"
          id="findModal"
          tabindex="-1"
          aria-labelledby="findModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="findModalLabel">
                  아이디/비밀번호 찾기
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <!-- 아이디 찾기 폼 -->
                <form id="findIdForm">
                  <div class="mb-3">
                    <label for="emailForId" class="form-label"
                      >가입 시 등록한 이메일</label
                    >
                    <input
                      type="email"
                      class="form-control"
                      id="emailForId"
                      required
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">
                    아이디 찾기
                  </button>
                </form>

                <!-- 비밀번호 찾기 폼 -->
                <form id="findPasswordForm">
                  <div class="mb-3">
                    <label for="usernameForPassword" class="form-label"
                      >아이디</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="usernameForPassword"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="emailForPassword" class="form-label"
                      >가입 시 등록한 이메일</label
                    >
                    <input
                      type="email"
                      class="form-control"
                      id="emailForPassword"
                      required
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">
                    비밀번호 찾기
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
//자바스크립트 코드를 포함
import axios from "axios";

export default {
  data() {
    return {
      id: "",
      pwd: "",
      name: "",
    };
  },
  created() {},
  methods: {
    loginData() {
      let methods = "post";
      let url = "/api/user/userLogin";
      let data = {
        param: {
          id: this.id,
          pwd: this.pwd,
        },
      };
      return {
        method: methods,
        url,
        data,
      };
    },
    async login() {
      //자체 로그인 요청
      let data = this.loginData();
      let result = await axios(data)
        .then((result) => {
          if (result.data[0].loginCheck > 0) {
            this.$store.commit("userStore/user", {
              id: this.id,
              mem_no: result.data[0].mem_no,
              name: result.data[0].name,
              isLogin: true,
              mem_status: result.data[0].mem_status,
            });
            this.$router.push("/");
            alert(this.$store.state.userStore.name + "님 로그인 되었습니다.");
            console.log(this.$store.state.userStore.isLogin);
            console.log(this.$store.state.userStore.id);
            console.log(this.$store.state.userStore.mem_no);
            console.log(this.$store.state.userStore.name);
            console.log(this.$store.state.userStore.mem_status);
          } else {
            alert("아이디/비밀번호를 확인해주세요.");
            this.$router.go(0);
          }
        })
        .catch((err) => console.log(err));
    },

    //카카오 로그인 데이터 전송
    async kakaoLogin() {
      // 카카오 로그인 요청
      window.Kakao.Auth.login({
        scope:
          "account_email, name, gender, birthday, birthyear, phone_number, shipping_address",
        success: this.getKakaoAccount, // 성공적으로 로그인되면 getKakaoAccount 메소드 호출
      });
    },
    //카카오에서 받은 회원 정보를 처리하는 메소드
    async getKakaoAccount() {
      // 카카오 API를 사용하여 회원 정보를 가져옴
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: async (res) => {
          const kakao_account = res.kakao_account;
          const email = kakao_account.email;
          const name = kakao_account.name;
          const gen = kakao_account.gender;
          const birth_dt = kakao_account.birthyear + kakao_account.birthday;
          const phone = kakao_account.phone_number;
          const addr = kakao_account.shipping_address;
          const kakao_id = res.id; // 카카오에서 제공하는 고유 아이디

          // 카카오 아이디를 서버로 전송하여 디비와 비교
          const data = {
            id: kakao_id,
            name: name,
            phone: phone,
            email: email,
            addr: addr == undefined ? "" : addr,
            addrdt: "",
            mem_status: 3,
            grd_no: 1,
            gen: gen == undefined ? "" : gen,
          };

          console.log(data);
          // 서버에 카카오 아이디 전송 후 처리
          const result = await axios.post("/apiuser/checkKakao", data);
          let datas = result.data;
          console.log(datas);

          // 로그인이 성공하면 상태를 업데이트하고 메인 페이지로 이동합니다.
          if (datas.length == 1) {
            //로그인 처리
            this.$store.commit("userStore/user", {
              id: datas[0].id,
              name: datas[0].name,
              isLogin: true,
              mem_no: datas[0].mem_no,
              mem_status: datas[0].mem_status,
              token: datas[0].token,
            });

            alert(`${datas[0].name}님 로그인 되었습니다.`);
            this.$router.push("/");
          } else {
            alert("로그인에 실패했습니다.");
          }
        },
        fail: (error) => {
          console.log(error);
        },
      });
    },

    // 카카오 아이디로 로그인하는 메소드
    async loginWithKakaoId(kakao_id) {
      // 서버에 카카오 아이디를 전송하여 로그인 처리합니다.
      const data = {
        id: kakao_id,
      };

      const result = await axios.post("/api/user/loginWithKakaoId", data);
    },
    // 카카오 회원 정보로 회원 가입하는 메소드
    async registerWithKakaoAccount(
      kakao_id,
      email,
      name,
      gen,
      birth_dt,
      phone,
      addr
    ) {
      // 서버에 카카오 회원 정보를 전송하여 회원 가입 처리합니다.
      const data = {
        mem_no: result.data[0].mem_no,
        id: kakao_id,
        email: email,
        name: name,
        gen: gen,
        birth_dt: birth_dt,
        phone: phone,
        addr: addr,
        mem_status: 2,
        grade_no: 1,
      };

      const result = await axios.post(
        "/api/user/registerWithKakaoAccount",
        data
      );

      // 회원 가입이 성공하면 로그인 처리합니다.
      if (result.data.success) {
        this.loginWithKakaoId(kakao_id);
      } else {
        alert("로그인에 실패했습니다.");
      }
    },
  },
};
</script>