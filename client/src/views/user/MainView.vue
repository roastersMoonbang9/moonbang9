<template>
    <div class="home">
        <Header />                
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/admin">admin</router-link> |
            <router-link to="/about">About</router-link> | 
            <router-link to="/product">상품목록</router-link> |
            <router-link to="/cart">cart</router-link> |
            <router-link to="/login">로그인 화이팅화이팅!!</router-link> |
            <router-link to="/userJoin">회원가입 힘내힘내!!</router-link>
        </nav>
        <router-view :key="$route.fullPath"/>
        <h1>메인페이지 작업중</h1>
        <Footer />
    </div>
</template>
<script>
import Header from '../../layouts/user/HeaderComponent.vue'
import Footer from '../../layouts/user/FooterComponent.vue'

export default {
    name: 'MainView',
    components: {
        Header,
        Footer
    }
}
</script>
<style>

  @import '../../assets/user/style.default.css';
</style>
