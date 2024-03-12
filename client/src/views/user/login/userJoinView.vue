<!-- userJoinView.vue -->
<template>
  <div class="userJoin">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>회원가입</title>
      <link
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        rel="stylesheet"
      />
    </head>
    <body>
      <div class="container mt-5">
        <h2 class="mb-4">회원가입</h2>
        <form>
          <div class="row">
            <div class="form-item col-lg-6 my-3">
              <label for="username">아이디<sup>*</sup></label>
              <input @change="this.getUserList()"
                type="text"
                class="form-control"
                placeholder="아이디를 입력하세요"
                id="id"
                v-model="userInfo.id"
                autofocus
              />
              <p class="form-label">
                - 5~20자까지의 영문 소문자, 숫자만 사용 가능합니다.
              </p>

              <button
                type="button"
                class="btn btn-primary mt-2"
                @click="checkID"
              >
                아이디 중복 확인
              </button>
            </div>
          </div>
          <div class="row">
            <div class="form-item col-lg-6 my-3">
              <label for="password">비밀번호<sup>*</sup></label>
              <input
                type="password"
                class="form-control"
                placeholder="비밀번호를 입력하세요"
                id="pw"
                v-model="userInfo.pw"
              />
            </div>
          </div>
          <p class="form-label">
            - 8~16자, 영문 대/소문자, 숫자, 특수문자(~!@#$%^&*)만 사용 가능
          </p>
          <div class="row">
            <div class="form-item col-lg-6 my-3">
              <label for="confirmPassword">비밀번호 확인<sup>*</sup></label>
              <input
                type="password"
                class="form-control"
                placeholder="비밀번호를 한번 더 입력하세요"
                id="pw_confirm"
                v-model="userInfo.pw_confirm"
              />
            </div>
          </div>
          <div class="row">
            <div class="form-item col-lg-6 my-3">
              <label class="bold">이름<sup>*</sup></label>
              <input
                type="text"
                class="form-control"
                placeholder="이름을 입력하세요"
                id="name"
                v-model="userInfo.name"
              />
            </div>
          </div>
          <div class="row">
            <div class="form-item col-lg-6 my-3">
              <label class="bold">휴대전화<sup>*</sup></label>
              <input
                type="text"
                class="form-control"
                placeholder="'-'없이 숫자만 입력"
                id="phone"
                v-model="userInfo.phone"
              />
            </div>
          </div>
          <div class="row">
            <div class="form-item col-lg-6 my-3">
              <label for="birthday">생년월일</label>
              <input
                type="date"
                class="form-control"
                id="birth"
                v-model="userInfo.birth"
              />
            </div>
          </div>
          <div class="form-group">
            <label>성별</label>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="M"
                v-model="userInfo.gen"
              />
              <label class="form-check-label" for="male">남성</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="F"
                v-model="userInfo.gen"
              />
              <label class="form-check-label" for="female">여성</label>
            </div>
          </div>
          <div class="row">
            <div class="form-item col-lg-6 my-3">
              <label class="bold">이메일<sup>*</sup></label>
              <input
                type="text"
                class="form-control"
                placeholder="이메일 입력 (예시 : email@example.com)"
                id="email"
                v-model="userInfo.email"
              />
            </div>
          </div>
          <div class="row">
            <div class="form-item col-lg-6 my-3">
              <div class="form-item w-100">
                <label class="bold">기본주소<sup>*</sup></label>
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
                <br /><br />
                <div>
                  <AddrsPost v-on:userEvent="updateUser" />
                </div>
              </div>
            </div>
          </div>
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
          <div class="row">
            <div class="form-item col-lg-6 my-3">
              <button
                type="button"
                class="btn btn-primary2 border-secondary py-3 px-4 text-uppercase w-100"
                @click="userInsert()"
              >
                회원가입
              </button>
            </div>
          </div>
        </form>
      </div>
    </body>
  </div>
</template>

<script>
import axios from "axios";
import AddrsPost from "@/components/AddrsPost.vue";

export default {
  name: "SignUp",
  data() {
    return {
      userInfo: {
        id: "",
        pw: "",
        pw_confirm: "",
        name: "",
        phone: "",
        birth: null,
        gen: "",
        email: "",
        postcode: "",
        address: "",
        address_detail: "",
        point: "",
        token: "",
        mem_status: 2,
        grd_no: 1
      },
      userList: [],
      check: false,
    };
  },
  components: { AddrsPost },
  methods: {
    validation() {
      if (this.userInfo.id == "") {
        alert("아이디를 입력해주세요.");
        return false;
      }
      if (this.userInfo.pw == "") {
        alert("비밀번호를 입력해주세요.");
        return false;
      }
      if (this.userInfo.pw_confirm == "") {
        alert("비밀번호 확인을 입력해주세요.");
        return false;
      }
      if (this.userInfo.name == "") {
        alert("이름을 입력해주세요.");
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
      if (!/^(?=.*[a-z])[a-z0-9]{5,20}$/g.test(this.userInfo.id)) {
        alert("아이디는 5~20자, 영문 소문자(필수), 숫자만 사용 가능합니다.");
        return false;
      }
      if (!/^[a-zA-Z0-9~!@#$%^&*]{8,16}$/g.test(this.userInfo.pw)) {
        alert(
          "비밀번호는 8~16자, 영문 대/소문자, 숫자, 특수문자(~!@#$%^&*)만 사용 가능합니다."
        );
        return false;
      }
      if (!(this.userInfo.pw == this.userInfo.pw_confirm)) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
      }
      if (!this.check) {
        alert("아이디 중복확인을 해주세요.");
        return false;
      }

      return true;
    },
    // openPostcode() {
    //     new window.daum.Postcode({
    //         oncomplete : (data) => {
    //             this.userInfo.postcode = data.zonecode;
    //             this.userInfo.address = data.roadAddress;
    //         }
    //     }).open();
    // },
    getCode(zonecode, roadAddress) {
      this.userInfo.postcode = zonecode;
      this.userInfo.address = roadAddress;
    },
    async getUserList() {
      let result = await axios
        .get("/api/user/checkUser/"+ this.userInfo.id)
        .catch((err) => console.log(err));
      this.userList = result.data;
      console.log(this.userList);
    },
    checkID() {
      if (this.userInfo.id == "") {
        alert("아이디를 입력해주세요.");
        return false;
      } else {
        console.log(this.userList.id);
        if (this.userInfo.id == this.userList.id) {
          alert("해당 아이디는 사용 중입니다.");
          return false;
        } else {
          alert("사용 가능한 아이디입니다.");
          this.check = true;
          return true;
        }
      }
    },
    // 주소 입력 API
    updateUser(value) {
      console.log(value);
      this.userInfo.address = value.addrr;
      this.userInfo.postcode = value.zip;
    },
    //회원 정보 등록
    async userInsert() {
      if (!this.validation()) return;
      this.userInfo.birthday = this.getDate(this.userInfo.birthday);
      let data = {
        param: {
          id: this.userInfo.id,
          pwd: this.userInfo.pw,
          name: this.userInfo.name,
          phone: this.userInfo.phone,
          email: this.userInfo.email,
          birth_dt: this.userInfo.birth,
          gen: this.userInfo.gen,
          post_cd: this.userInfo.postcode,
          user_type: this.userInfo.type,
          addr: this.userInfo.address,
          addrdt: this.userInfo.address_detail,
          mem_status: this.userInfo.mem_status,
          grd_no: this.userInfo.grd_no,
        },
      };
      console.log(data)
      let result = await axios

        .post("/api/user/userJoin", data)
        .catch((err) => console.log(err));
      let info = result.data.affectedRows;
      if (info > 0) {
        alert("회원가입이 완료되었습니다.");
      }
      this.$router.push({ path: "/" });
    },
    getDate(dates) {
      let res = null;
      if (dates != null) {
        let date = new Date(dates);
        let y = date.getFullYear();
        let m = ("0" + (date.getMonth() + 1)).slice(-2);
        let d = ("0" + date.getDate()).slice(-2);

        res = `${y}-${m}-${d}`;
      }
      return res;
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