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
        <!-- Spinner Start -->
        <!-- <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div> -->
        <!-- Spinner End -->
        <!-- Sign In Start -->
        <div class="container-fluid">
            <div class="row h-100 align-items-center justify-content-center" style="min-height: 100vh;">
                <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                    <div class="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <a href="index.html" class="">
                                <h3 class="text-primary"><i class="fa fa-hashtag me-2"></i>문방구</h3>
                            </a>
                            <h3>로그인</h3>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" v-model="id">
                            <label for="floatingInput">아이디</label>
                        </div>
                        <div class="form-floating mb-4">
                            <input type="password" class="form-control" id="floatingPassword" v-model="pwd">
                            <label for="floatingPassword">비밀번호</label>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mb-4">                            
                            <a href="">아이디/비밀번호 찾기</a>
                        </div>
                        <button type="submit" class="btn btn-primary py-3 w-100 mb-4" @click="login()" >로그인</button>
                        <p class="text-center mb-0">아직 문방구 회원이 아니신가요? <br> <a href="/userJoin">회원가입하기</a></p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Sign In End -->
      </div>
    </body>
  </div>
</template>

<script>
//자바스크립트 코드를 포함
import axios from 'axios';

 export default {
    data() {
        return {
            id:"",
            pwd:"",
            name:""
        };
    },
    created() {
        
    },
    methods:{
      loginData(){
        let methods = 'post';
        let url ='/api/user/userLogin';
        let data= {"param":{
          id:this.id,
          pwd:this.pwd
        }};

        return {
          method : methods,
          url,
          data
        }
      },
      async login(){
        let data =this.loginData();
        let result = await axios(data).then(result => {
          console.log("이건 뭐지", result);
          if (result.data[0].loginCheck > 0){
            this.$store.commit('user', {id:this.id, mem_no:result.data[0].mem_no, name:result.data[0].name, isLogin:true})
            this.$router.push('/')
            alert( this.$store.state.name + "님 로그인 되었습니다.")
            console.log(this.$store.state.isLogin);
            console.log(this.$store.state.id);
            console.log(this.$store.state.mem_no);
            console.log(this.$store.state.name);
            
          }else{
            alert('아이디/비밀번호를 확인해주세요.')
            this.$router.go(0)
          }
        })
        .catch(err => console.log(err))
      }
    }
 }
</script>