<template>
  <div>
    <a id="custom-login-btn" @click="kakaoLogin()">
      <img
        src="//k.kakaocdn.net/14/dn/btqCn0|EmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
        width="222"
      />
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: 'profile, account_email',
        success: this.getKakaoAccount,
      });
    },
    getKakaoAccount() {
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: res => {
          const kakao_account = res.kakao_account;
          const name = kakao_account.profile.nickname;
          const email = kakao_account.email;
          console.log('name', name);
          console.log('email', email);
          alert('로그인 성공');
        },
        fail: error => {
          console.log(error);
        },
      });
    },
  },
};
</script>

<style>
</style>