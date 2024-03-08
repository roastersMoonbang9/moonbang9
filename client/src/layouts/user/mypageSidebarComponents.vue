<template>
    <div id="lnbMy10x10V15" class="lnbMy10x10V15">
	<!---->

	<div class="article profile new_pro21">
		<p class="hello">안녕하세요, 이름님</p>
		<div class="figure" id="myProfile">
			
			<strong class="classV18 g-white">WHITE 회원</strong>
			<div class="profile_container">
				<img src="http://fiximage.10x10.co.kr/web2015/common/img_profile_11.png" width="100" height="100" alt="프로필이미지">
			</div>
			<div class="pro_info_area">
				<p class="glade"></p>
				<p class="nick_name">프로필 입력하기</p>
			</div>
			<!-- // -->
		</div>
    <div>
		<ul>
			<li><a><strong>1장</strong>쿠폰</a></li>
			<li class="mymileage"><a><strong>0P</strong>포인트</a><span id="mileageCreditAvailable"></span></li>
		</ul>
  </div>
	</div>

	<div class="article nav15" style="margin-top:10rem;">
		<div class="quick">
			<strong class="heading"><span></span>QUICK MENU</strong>
			<ul>
            <li><router-link to="/inquiry">1:1문의</router-link></li>
            <li><router-link to="/cart">장바구니</router-link></li>
            <li><router-link to="/orders">주문내역확인</router-link></li>
            <li><router-link to="/edit-profile">회원정보수정</router-link></li>
            <li><router-link to="/withdraw">회원탈퇴</router-link></li>
        </ul>
		</div>
	</div>

</div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userName: '사용자 이름', // 사용자 이름
        userGrade: '회원 등급', // 회원 등급
        userPoints: '0' // 포인트
      };
    }
  };
  </script>
  
<style scoped>
.lnbMy10x10V15 {
    width: 212px;
    margin: 2rem 0;
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
    padding-top: 13px;
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
  