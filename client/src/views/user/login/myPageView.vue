<template>
  <div>
    <head>
      <!-- Icon Font Stylesheet -->
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
        rel="stylesheet"
      />
    </head>
    <div class="content">
      <p>마이페이지</p>
      <div class="sidebar">
        <div class="user-info">
          <div class="user-name">{{ userName }}</div>
          <div class="user-grade">등급: {{ userGrade }}</div>
          <div class="user-points">포인트: {{ userPoints }}</div>
        </div>
        <div class="menu">
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

<style>
.content {
  display: flex;
}

.sidebar {
  width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
}

.user-info {
  margin-bottom: 20px;
}

.user-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.menu ul {
  list-style: none;
  padding: 0;
}

.menu ul li {
  margin-bottom: 10px;
}

.menu ul li a {
  text-decoration: none;
  color: #333;
}
</style>
