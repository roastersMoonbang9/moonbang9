<template>
  <div class="userUpdate">
    <div class="container mt-5">
      <h2 class="mb-4">회원 정보 수정</h2>
      <form @submit.prevent="updateUser">
        <!-- 아이디 -->
        <div class="row">
          <div class="form-item col-lg-6 my-3">
            <label for="username">아이디<sup>*</sup></label>
            <input
              type="text"
              class="form-control"
              :value="userInfo.id"
              readonly
            />
          </div>
        </div>
        <!-- 비밀번호 -->
        <div class="row">
          <div class="form-item col-lg-6 my-3">
            <label for="password">새 비밀번호<sup>*</sup></label>
            <input
              type="password"
              class="form-control"
              placeholder="새 비밀번호를 입력하세요"
              v-model="userInfo.newPassword"
            />
          </div>
        </div>
        <!-- 비밀번호 확인 -->
        <div class="row">
          <div class="form-item col-lg-6 my-3">
            <label for="confirmPassword">비밀번호 확인<sup>*</sup></label>
            <input
              type="password"
              class="form-control"
              placeholder="비밀번호를 한번 더 입력하세요"
              v-model="userInfo.newPasswordConfirm"
            />
          </div>
        </div>
        <!-- 이름 -->
        <div class="row">
          <div class="form-item col-lg-6 my-3">
            <label class="bold">이름<sup>*</sup></label>
            <input
              type="text"
              class="form-control"
              :value="userInfo.name"
              readonly
            />
          </div>
        </div>
        <!-- 휴대전화 -->
        <div class="row">
          <div class="form-item col-lg-6 my-3">
            <label class="bold">휴대전화<sup>*</sup></label>
            <input
              type="text"
              class="form-control"
              placeholder="'-'없이 숫자만 입력"
              v-model="userInfo.phone"
            />
          </div>
        </div>
        <!-- 생년월일 -->
        <div class="row">
          <div class="form-item col-lg-6 my-3">
            <label for="birthday">생년월일</label>
            <input
              type="date"
              class="form-control"
              v-model="userInfo.birth"
            />
          </div>
        </div>
        <!-- 성별 -->
        <div class="form-group">
          <label>성별</label>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              id="male"
              value="M"
              v-model="userInfo.gender"
            />
            <label class="form-check-label" for="male">남성</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              id="female"
              value="F"
              v-model="userInfo.gender"
            />
            <label class="form-check-label" for="female">여성</label>
          </div>
        </div>
        <!-- 이메일 -->
        <div class="row">
          <div class="form-item col-lg-6 my-3">
            <label class="bold">이메일<sup>*</sup></label>
            <input
              type="text"
              class="form-control"
              placeholder="이메일 입력 (예시 : email@example.com)"
              v-model="userInfo.email"
            />
          </div>
        </div>
        <!-- 기본주소 -->
        <div class="row">
          <div class="form-item col-lg-6 my-3">
            <label class="bold">기본주소<sup>*</sup></label>
            <input
              type="text"
              class="form-control"
              placeholder="우편번호"
              v-model="userInfo.postcode"
              readonly
            />
          </div>
        </div>
        <!-- 상세주소 -->
        <div class="row">
          <div class="form-item col-lg-6 my-3">
            <input
              type="text"
              class="form-control"
              placeholder="도로명주소"
              v-model="userInfo.address"
              readonly
            />
            <input
              type="text"
              class="form-control my-3"
              placeholder="상세주소"
              v-model="userInfo.address_detail"
            />
          </div>
        </div>
        <!-- 수정 버튼 -->
        <div class="row">
          <div class="form-item col-lg-6 my-3">
            <button
              type="submit"
              class="btn btn-primary2 border-secondary py-3 px-4 text-uppercase w-100"
            >
              수정하기
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserUpdate",
  data() {
    return {
      userInfo: {
        id: "", // 아이디 (읽기 전용)
        name: "", // 이름 (읽기 전용)
        newPassword: "", // 새 비밀번호
        newPasswordConfirm: "", // 새 비밀번호 확인
        phone: "", // 휴대전화
        birth: null, // 생년월일
        gender: "", // 성별
        email: "", // 이메일
        postcode: "", // 우편번호
        address: "", // 도로명주소
        address_detail: "", // 상세주소
      },
    };
  },
  created() {
    // 사용자 정보를 가져오는 로직
    this.getUserInfo();
  },
  methods: {
    // 사용자 정보 가져오기
    async getUserInfo() {
      try {
        const response = await axios.get("/api/user/userInfo");
        this.userInfo = response.data;
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    // 사용자 정보 업데이트
    async updateUser() {
      // 유효성 검사 등 필요한 로직 수행
      // axios를 사용하여 서버로 사용자 정보 업데이트 요청
    },
  },
};
</script>

<style scoped>
/* 필요한 스타일링이 있다면 추가 */
</style>
