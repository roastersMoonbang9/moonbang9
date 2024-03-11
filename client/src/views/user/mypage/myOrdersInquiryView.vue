<template>
  <div class="container py-4">
    <h2 class="mb-4">마이페이지 1:1 문의 페이지</h2>
    <form @submit.prevent="submitInquiry" class="needs-validation" novalidate>
      <div class="form-group">
        <label for="inquiryTitle">문의 제목</label>
        <input type="text" class="form-control" id="inquiryTitle" v-model="inquiry.title" required>
        <div class="invalid-feedback">
          문의 제목을 입력해주세요.
        </div>
      </div>
      <div class="form-group">
        <label for="inquiryContent">문의 내용</label>
        <textarea class="form-control" id="inquiryContent" rows="5" v-model="inquiry.content" required></textarea>
        <div class="invalid-feedback">
          문의 내용을 입력해주세요.
        </div>
      </div>
      <button type="submit" class="btn btn-primary">문의 전송</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inquiry: {
        title: '',
        content: ''
      }
    };
  },
  methods: {
    submitInquiry() {
      if (this.$refs.form.checkValidity()) {
        // 문의 내용을 서버로 전송하는 로직
        console.log('문의 제목:', this.inquiry.title);
        console.log('문의 내용:', this.inquiry.content);
        // Axios 또는 Fetch API를 사용하여 AJAX 요청을 보낼 수 있습니다.
        // 전송 후에는 홈페이지로 리다이렉션 또는 사용자에게 확인 메시지를 보여줄 수 있습니다.
        alert('문의가 성공적으로 전송되었습니다.');
        // 전송 후에 폼 초기화
        this.resetForm();
      } else {
        // 폼 유효성 검사 실패 시 사용자에게 알림
        alert('모든 항목을 입력해주세요.');
      }
    },
    resetForm() {
      // 폼 초기화
      this.inquiry.title = '';
      this.inquiry.content = '';
    }
  }
}
</script>

<style scoped>
/* 필요한 스타일링을 추가하세요 */
</style>