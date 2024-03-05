<template>
    <header class="header bg-white" height=150px>
        <div class="container px-lg-3">
          <nav class="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
            <a class="navbar-brand" href="index.html">
              <img src="./../../public/moonbang9_2.png" alt="" style="width: 120px;"></a>
            <button class="navbar-toggler navbar-toggler-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto">
                <li class="nav-item">
                  <!-- Link--><router-link to="/" class="nav-link active" href="index.html">Home</router-link>
                </li>
                <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="pagesDropdown" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" 
                 @click="goToList('A')">다이어리</a>
                  <div class="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdown">
                    <a class="dropdown-item border-0 transition-link" href="index.html">다이어리</a>
                    <a class="dropdown-item border-0 transition-link" href="shop.html">플래너</a>
                    <a class="dropdown-item border-0 transition-link" href="detail.html">달력</a>
                  </div>
                </li>
                <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="pagesDropdown" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">노트</a>
                  <div class="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdown">
                    <a class="dropdown-item border-0 transition-link" href="index.html">베이직노트</a>
                    <a class="dropdown-item border-0 transition-link" href="shop.html">양장노트</a>
                    <a class="dropdown-item border-0 transition-link" href="detail.html">스프링노트</a>
                    <a class="dropdown-item border-0 transition-link" href="cart.html">수첩</a>
                    <a class="dropdown-item border-0 transition-link" href="checkout.html">메모지</a>
                  </div>
                </li>
                <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="pagesDropdown" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">필기류</a>
                  <div class="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdown">
                    <a class="dropdown-item border-0 transition-link" href="index.html">연필</a>
                    <a class="dropdown-item border-0 transition-link" href="shop.html">펜</a>
                    <a class="dropdown-item border-0 transition-link" href="detail.html">형광펜</a>
                    <a class="dropdown-item border-0 transition-link" href="cart.html">지우개</a>
                  </div>
                </li>
                <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="pagesDropdown" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">사무용품</a>
                  <div class="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdown">
                    <a class="dropdown-item border-0 transition-link" href="index.html">복사용지</a>
                    <a class="dropdown-item border-0 transition-link" href="shop.html">필통</a>
                    <a class="dropdown-item border-0 transition-link" href="detail.html">가위</a>
                    <a class="dropdown-item border-0 transition-link" href="cart.html">계산기</a>
                    <a class="dropdown-item border-0 transition-link" href="checkout.html">풀</a>
                  </div>
                </li>
                <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="pagesDropdown" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">데코레이션</a>
                  <div class="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdown">
                    <a class="dropdown-item border-0 transition-link" href="index.html">스티커</a>
                    <a class="dropdown-item border-0 transition-link" href="shop.html">스탬프</a>
                    <a class="dropdown-item border-0 transition-link" href="detail.html">테이프</a>
                    <a class="dropdown-item border-0 transition-link" href="cart.html">포스터</a>
                  </div>
                </li>
              </ul>
              <ul class="navbar-nav ms-auto">               
                <li class="nav-item"><a class="nav-link" href="cart.html"> <i class="fas fa-dolly-flatbed me-1 text-gray"></i>Cart<small class="text-gray fw-normal">(2)</small></a></li>
                <li class="nav-item"><a class="nav-link" href="#!"> <i class="far fa-heart me-1"></i><small class="text-gray fw-normal"> (0)</small></a></li>
                <li v-if="isLogin" class="nav-item"><a class="nav-link" href="/"> <i class="fas fa-user me-1 text-gray fw-normal"></i>마이페이지</a></li>
                <li v-else class="nav-item"><a class="nav-link" href="/userJoin"> <i class="fas fa-user me-1 text-gray fw-normal"></i>회원가입</a></li>
                <li v-if="isLogin" class="nav-item"><a class="nav-link" href="/logout"><i class="fas fa-user me-1 text-gray fw-normal"></i>로그아웃</a></li>
                <li v-else class="nav-item"><a class="nav-link" href="/login"><i class="fas fa-user me-1 text-gray fw-normal"></i>로그인</a></li>                
              </ul>      
            </div>
          </nav>
        </div>
    </header>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex'; // Vuex store 사용

export default {
  setup() {
    const store = useStore();
    const isLogin = computed(() => store.state.isLogin);

    return {
      isLogin
    };
  },
   data () {
      return {
        category: null
      }
    },
    methods : {
      goToList(cate) {
        console.log(cate);
        this.category = cate;
        console.log(this.category) ;
        this.$router.push({ path : '/product', query : { 'category' : this.category }})
      }
    }
}
</script>
