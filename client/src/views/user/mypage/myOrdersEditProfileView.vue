<template>
  <div class="userUpdate">
    <div class="container mt-5">
      <h2 class="mb-4">회원 정보 수정</h2>
      <form @submit.prevent="userUpdate">
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
              v-model="userInfo.pwd"
            />
          </div>
        </div>
        <p class="form-label">
          - 8~16자, 영문 대/소문자, 숫자, 특수문자(~!@#$%^&*)만 사용 가능
        </p>
        <!-- 비밀번호 확인 -->
        <div class="row">
          <div class="form-item col-lg-6 my-3">
            <label for="confirmPassword">비밀번호 확인<sup>*</sup></label>
            <input
              type="password"
              class="form-control"
              placeholder="비밀번호를 한번 더 입력하세요"
              v-model="newPasswordConfirm"
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
              v-model="phoneNum"
              maxlength="11"
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
        <!-- 이메일 -->
        <div class="row">
          <div class="form-item col-lg-6 my-3">
            <label class="bold">이메일<sup>*</sup></label>
            <input
              type="text"
              class="form-control"
              placeholder="이메일 입력 (예시 : email@example.com)"
              v-model="userInfo.email"
              @change="emailState(userInfo.email)"
            />
          </div>
        </div>
        <!-- 기본주소 -->
        <div class="row">
          <div class="form-item col-lg-6 my-3">
            <label class="bold">기본주소<sup>*</sup></label>
            <div>
              <AddrsPost v-on:userEvent="updateUser" />
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="우편번호"
              id="postcode"
              v-model="userInfo.postcode"
              readonly
            />
          </div>
        </div>
        <div class="col-md-12 col-lg-6">
          <div class="form-item w-100">                        
          </div>
        </div>
        <!-- 상세주소 -->
        <div class="row">
          <div class="form-item col-lg-6 my-3">
            <input
              type="text"
              class="form-control"
              placeholder="도로명주소"
              id="address"
              v-model="userInfo.address"
              readonly
            />
            <input
              type="text"
              class="form-control my-3"
              placeholder="상세주소"
              id="address_detail"
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
              @click="userUpdate()"
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
import AddrsPost from "@/components/AddrsPost.vue";

export default {
  name: "UserUpdate",
  data() {
    return {
      userInfo: {
        id: this.$store.state.userStore.id, // 아이디 (읽기 전용)
        name: this.$store.state.userStore.name, // 이름 (읽기 전용)
        pwd: "", // 새 비밀번호
        phone: this.$store.state.userStore.phone, // 휴대전화
        birth: this.$store.state.userStore.birth_dt, // 생년월일 (읽기 전용)
        email: this.$store.state.userStore.email, // 이메일
        postcode: this.$store.state.userStore.post_cd, // 우편번호
        address: this.$store.state.userStore.addr, // 도로명주소
        address_detail: this.$store.state.userStore.addrdt, // 상세주소
      },
      userList: [],
      check: false,
      newPasswordConfirm: "", // 새 비밀번호 확인
    };
  },
  created() {},
  computed: {
    phoneNum: {
      get() {
        return this.userInfo.phone;
      },
      set(newValue) {
        if (newValue.length == 11) {
          this.userInfo.phone = newValue.replace(
            /^(\d{3})(\d{4})(\d{4})$/,
            `$1-$2-$3`
          );
        }
      },
    },
  },
  components: { AddrsPost },
  methods: {
    validation() {
      if (this.userInfo.pwd == "") {
        alert("비밀번호를 입력해주세요.");
        return false;
      }
      if (this.newPasswordConfirm == "") {
        alert("비밀번호 확인을 입력해주세요.");
        return false;
      }
      if (this.userInfo.phone == "") {
        alert("휴대전화를 입력해주세요.");
        return false;
      }
      if (this.userInfo.email == "") {
        alert("이메일을 입력해주세요.");
        return false;
      }
      if (this.userInfo.postcode == "") {
        alert("기본주소를 입력해주세요.");
        return false;
      }
      if (this.userInfo.address_detail == "") {
        alert("상세주소를 입력해주세요.");
        return false;
      }
      if (!/^[a-zA-Z0-9~!@#$%^&*]{8,16}$/g.test(this.userInfo.pwd)) {
        alert(
          "비밀번호는 8~16자, 영문 대/소문자, 숫자, 특수문자(~!@#$%^&*)만 사용 가능합니다."
        );
        return false;
      }
      if (!(this.userInfo.pwd == this.newPasswordConfirm)) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
      }
      return true;
    },
    getCode(zonecode, roadAddress) {
      this.userInfo.postcode = zonecode;
      this.userInfo.address = roadAddress;
    },
    //이메일 유효성 확인
    emailState(value) {
      if (
        value.indexOf("@") == -1 &&
        (value.indexOf(".com") == -1 || value.indexOf(".net") == -1)
      ) {
        Swal.fire("부정확한 이메일입니다. \n 정확한 이메일로 작성해주세요.");
        this.userInfo.email = "";
      }
    },
    // 주소 입력 API
    updateUser(value) {
      console.log(value);
      this.userInfo.address = value.addrr;
      this.userInfo.postcode = value.zip;
    },
    // 사용자 정보 업데이트
    async userUpdate() {
      if (!this.validation()) return;

      let data = {
        param: {
          pwd: this.userInfo.pwd,
          phone: this.userInfo.phone,
          email: this.userInfo.email,
          post_cd: this.userInfo.postcode,
          user_type: this.userInfo.type,
          addr: this.userInfo.address,
          addrdt: this.userInfo.address_detail,
          birth_dt: this.userInfo.birth,
        },
      };
      let result = await axios
        .post(
          `/api/user/userUpdate/${this.$store.state.userStore.mem_no}`,
          data
        )
        .catch((err) => console.log(err));
      let info = result.data.affectedRows;
      if (info > 0) {
        alert("회원정보 수정이 완료되었습니다.");
      } else {
        alert("회원정보 수정에 실패하였습니다.");
      }
      // 유효성 검사 등 필요한 로직 수행
      // axios를 사용하여 서버로 사용자 정보 업데이트 요청
    },
  },
};
</script>

<style scoped>
.center {
  justify-content: center;
}

sup {
  color: red;
}

.bold {
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.margin-right {
  margin-right: 0.5rem;
}

input::placeholder {
  color: #cccccc;
}

input:read-only {
  background-color: #eeeeee;
}

.breadcrumb-item + .breadcrumb-item::before {
  float: left;
  padding-right: 0.5rem;
  color: #fd7e14;
  content: var(--bs-breadcrumb-divider, "/");
  /* rtl: var(--bs-breadcrumb-divider, "/") */
}
</style>