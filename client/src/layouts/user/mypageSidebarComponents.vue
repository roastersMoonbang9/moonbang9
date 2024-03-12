<template>
    <aside id="lnbMy10x10V15" class="lnbMy10x10V15" style="float: none;">
	<div class="article profile new_pro21">
		<div class="figure" id="myProfile">	
			<div class="profile_container">                
				<img  src="../img/nomal.PNG" width="100" height="100">
			</div>
			<div class="pro_info_area">
				<p class="glade"></p>                
			    <strong class="classV18 g-white">{{userInfo.grd_name}} 회원</strong>
                <p class="hello">안녕하세요, {{userName}}님</p>
				<p class="hello">좋은 하루 되세요</p>
			</div>
		</div>
    <div>
		<ul>
			<li><a @click="moveCouponList()"><strong>{{coupon}}장</strong>쿠폰</a></li>
			<li class="mymileage"><a><strong>{{userInfo.point}}P</strong>포인트</a><span id="mileageCreditAvailable"></span></li>
		</ul>
  </div>
	</div>

	<div class="article nav15" style="margin-top:10rem;">
		<div class="quick">
			<strong class="heading" style="font-size: 14px;"><span></span>QUICK MENU</strong>
			<ul>
            <li><router-link to="/myPage/inquiry">1:1문의</router-link></li>
            <li><router-link to="/cart">장바구니</router-link></li>
            <li><router-link to="/myPage/myOrders">주문내역확인</router-link></li>
            <li><router-link to="/myPage/editProfile">회원정보수정</router-link></li>
            <li @click="withdraw()"><a href="/" @click.prevent="">회원탈퇴</a></li>
        </ul>
		</div>
	</div>
</aside>
  </template>
  
<script>
import axios from 'axios'

  export default {
    data() {
      return {
        userName: this.$store.state.userStore.name, // 사용자 이름
        userInfo: {
            grd_name: '', // 회원 등급
            point: 0 // 포인트
        },
        coupon : ''
      };
    },
    created(){
        this.getGrade();
        this.getCoupon();
    },
    methods: {
        moveCouponList(){
            this.$router.push({ path: 'myCouponList' })
        },
        // 포인트 및 등급 정보
        async getGrade() {
          let result = await axios.get(`/apiuser/gradePoint/${this.$store.state.userStore.mem_no}`)
          .catch(err => console.log(err));
          let list = result.data[0];
          this.userInfo = list;
        },
        // 쿠폰 정보
        async getCoupon() {
          let result = await axios.get(`/apiuser/possCouponCount/${this.$store.state.userStore.mem_no}`)
          .catch(err => console.log(err));
          let count = result.data[0].count;
          console.log(count);
          this.coupon = count;
        },
        // 회원탈퇴
        withdraw(){
          let vue = this;
          Swal.fire({
          title: "정말 탈퇴하시겠습니까?",
          text: "탈퇴를 원하시나요?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#6799FF",
          cancelButtonColor: "#FF8383",
          confirmButtonText: "뒤로 가기",
          cancelButtonText: "탈퇴하기"
          }).then((result) => {
            if (result.isConfirmed) {
            }else{
              vue.complete();
              vue.handleLogout();
              vue.$router.push({path : `/`});
            }
          });
        },
        // 회원탈퇴처리
        async complete(){
          let result = await axios.put(`/apiuser/userQuit/${this.$store.state.userStore.mem_no}`)
          .catch(err => console.log(err));
          let list = result.data;
          console.log(list);
        },
        // 탈퇴 후 로그아웃 처리
        handleLogout() {
        this.$store.commit('userStore/logout'); 
        this.$router.push('/login');
        },
        // 메인으로 이동
        goToMain(){
            this.$router.push({ path : '/'})
        }
    }
  };
</script>
  
<style scoped>
.lnbMy10x10V15 {
    width: 212px;
    margin: 2rem 0;
    float: left;
}
.lnbMy10x10V15 .article:first-child {
    margin-top: 0;
}
.lnbMy10x10V15 .profile {
    padding-top: 29px;
    background-color: #fff;
    text-align: center;
}

.lnbMy10x10V15 .article {
    margin-top: 20px;
}
.lnbMy10x10V15 .profile .hello {
    color: #000;
    font-size: 14px;
    font-weight: bold;
    line-height: 1.25em;
}
.lnbMy10x10V15 .profile .figure {
    position: relative;
    margin-top: 15px;
}
.lnbMy10x10V15 .profile.new_pro21 .figure .profile_container {
    width: 100px;
    height: 106px;
    margin: 0 auto;
    border-radius: 100%;
    overflow: hidden;
    object-fit: cover;
    display: flex;
    align-items: center;
    justify-content: center;
}
.lnbMy10x10V15 .profile.new_pro21 .figure img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.lnbMy10x10V15 .profile .figure a {
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    width: 112px;
    height: 112px;
    margin-left: -56px;
    background: url(http://fiximage.10x10.co.kr/web2015/my10x10/bg_sprite.png) no-repeat 0 0;
    font-size: 11px;
    text-indent: -999em;
}

a:link, a:active, a:visited {
    color: #555;
}
.lnbMy10x10V15 .profile .figure .pro_info_area {
    margin-top: 12px;
    text-align: center;
}
.lnbMy10x10V15 .profile .figure .pro_info_area .glade {
    font-size: 12px;
    color: #999;
}
.lnbMy10x10V15 .profile .figure .pro_info_area .nick_name {
    font-size: 14px;
    color: #333;
    font-weight: 500;
}
.lnbMy10x10V15 .profile ul {
    margin-top: 24px;
    border-top: 1px dotted #ccdbe1;
    margin-left: -1px;
    list-style: none;
    padding: 0;
}
.lnbMy10x10V15 .profile ul li {
    float: left;
    width: 50%;
    border-bottom: 1px solid #f4eade;
}
.lnbMy10x10V15 .profile ul li a {
    display: block;
    padding: 13px 0;
    border-left: 1px solid #f4eade;
    background-color: #f9f9f9;
    color: #555;
    font-size: 13px;
}
.lnbMy10x10V15 .profile ul li a strong {
    display: block;
    color: #000;
}
.lnbMy10x10V15 .article {
    margin-top: 20px;
}
.lnbMy10x10V15 .quick {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 20px;
}
.lnbMy10x10V15 .heading {
    display: block;
    overflow: hidden;
    position: relative;
    width: 212px;
    height: 38px;
    color: #000;
    font-size: 11px;
    line-height: 38px;
    text-align: center;
}
.lnbMy10x10V15 .quick ul {
    padding: 14px 20px 20px;
    list-style: none;
}
.lnbMy10x10V15 .quick ul li {
    margin-top: 14px;
    font-size: 13px;
    line-height: 1.25em;
}
.lnbMy10x10V15 .quick ul li a {
    color: #555;
}
</style>
  