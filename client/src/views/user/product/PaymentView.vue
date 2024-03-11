<template>
    <div class="overHidden tMar80">
      <h3>주문결제</h3>
    </div>
    <table class="baseTable tMar10 orderForm">
      <caption>주문리스트</caption><colgroup><col width="120px"><col width="55px"><col width=""><col width="110px"><col width="80px"><col width="95px"></colgroup>
      <thead>
        <tr>
          <th>상품코드</th>
          <th colspan="2">상품정보</th>
          <th>판매가격</th>
          <th>수량</th>
          <th>주문금액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(list, idx) in paymentList" v-bind:key="idx">
          <td>{{list.prdt_cd}}</td>
          <td><img v-bind:src="imgMod(list.image)" width="50px" height="50px" alt="01-Custard [커스터드]"></td>
          <td class="lt"><p class="tPad05">{{list.prdt_name}}</p><p class="tPad02" v-if="list.opt_name != null">옵션 : {{list.opt_name}}</p></td>
          <td> {{list.sale_price}}원 </td>
          <td> {{ list.cart_qty }}개 </td>
          <td>{{list.total_price}}원 </td>
        </tr>
      </tbody>
    </table>
        <!--주문금액 컴포넌트-->
        <TotalOrderPrice v-bind:list="paymentList"/>
        <!--주문고객 정보-->
<div class="overHidden tMar80">
    <h3>주문고객 정보</h3>
</div>
<table class="baseTable orderForm tMar10">
    <caption>주문고객 정보 입력</caption>
    <colgroup>
        <col width="12%"><col width="38%"><col width="12%"><col width="">
    </colgroup>
    <tbody>
    <tr>
        <th><label for="sendName">보내시는 분</label></th>
        <td><input type="text" class="txtInp" name="buyname" maxlength="32" v-model="userInfo.name" id="sendName" readonly></td>
        <th>이메일</th>
        <td>
            <p>
                <input type="text" class="txtInp" name="buyemail_Pre" title="이메일 아이디 입력" style="width:120px;" v-model="userInfo.email" @change="emailState(userInfo.email)" ref="emailFocus">
            </p>
            <p class="tPad05">주문정보를 이메일로 보내드립니다.</p>
        </td>
    </tr>
    <tr>
        <th><label for="hp01">휴대전화</label></th>
        <td>
            <p>                  
              <input type="text" class="txtInp" name="buyhp1" v-model="userInfo.phone" oninput="javascript: this.value = this.value.replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`);" title="주문고객 휴대전화번호 국번 입력" maxlength="12" id="hp01" readonly @change="phoneState(userInfo.phone)">
            </p>
            </td>
    </tr>
    </tbody>
</table>
<!--배송지 정보-->
<div class="overHidden tMar80">
        <h3>배송지 정보</h3>
        
    </div>
    <table class="baseTable orderForm tMar10">
        <caption>주문고객 정보 입력</caption>
        <colgroup>
            <col width="12%"><col width="38%"><col width="12%"><col width="">
        </colgroup>
        <tbody>
        <tr>
            <th><label for="sendName">받으시는 분</label></th>
            <td><input type="text" class="txtInp" name="buyname" maxlength="32" v-model="deliInfo.name" id="sendName" ref="deliNameFocus"></td>
        </tr>
        <tr>
            <th>주소</th>
            <td colspan="3">
                <!--주소 컴포넌트-->
                <p>
                  <input type="text" name="buyZip" v-model='deliInfo.post_cd' readonly title="우편번호" class="txtInp focusOn" style="width:100px; margin-right:1rem;" ref="addrFocus">
                  <AddrsPost v-on:userEvent="updateUser"/>
    </p>
    <p class="tPad05">
        <input name="buyAddr1" type="text" class="txtInp" style="width:420px;" v-model='deliInfo.addr' title="동까지의 주소 입력" readonly>
    </p>
                <p><input name="buyAddr2" type="text" class="txtInp" style="width:440px;" v-model="deliInfo.addrdt" title="상세주소 입력" @change="detailAddr"></p>
            </td>
        </tr>
        <tr>
            <th><label for="hp01">휴대전화</label></th>
            <td>
                <p>
                  <input type="text" class="txtInp" name="buyhp1" v-model="phoneNum" title="주문고객 휴대전화번호 국번 입력" maxlength="11" id="hp01" ref="deliPhoneFocus">
                </p>
                </td>
        </tr>
        </tbody>
    </table>
        <!--주문 할인정보 및 결제내역확인 컴포넌트-->
        <DiscountAndFinalPrice :list="paymentList" :point="userInfo.point" :fee="fee" @selected="updateSale1" @newPoint="updateSale2" @finalPrice="updateSale3" @couponPrice="updateSale4"/>
        <div class="orderNotiV21 tMar30">
            <p class="txtArrow">품절 발생 시 별도의 연락을 하지 않고 선택하신 결제 방법으로 안전하게 환불해 드립니다.</p>
            <p class="txtArrow tMar15">
                주문 진행을 위해 다음의 판매자(제3자)에게 개인정보를 제공합니다.
            </p>
            <div class="chkAgreeV21 tMar30"><label for="agreeAll"><input type="checkbox" id="agreeAll" v-model="checkItem" ref="checkTerms">모든 내용을 확인하였으며 구매조건에 동의합니다.</label></div>
            <!--:true-value="trueValueMethod()" :false-value="falseValueMethod()"-->
					</div>
          <div class="ct tPad30 bPad20" id="nextbutton1" name="nextbutton1" style="display: flex;justify-content: center;">
						<button class="lMar10 btn btnB2 btnWhite2 btnW220" @click="backBtn"><em class="gryArr02">이전 페이지</em></button>
						<button name="btnPay" id="btnPay" class="lMar10 btn btnB2 btnRed btnW220" @click="PaymentBtn">결제하기</button>
					</div>
  </template>

<script>
import TotalOrderPrice from '@/components/totalOrderPrice.vue';
import DiscountAndFinalPrice from '@/components/DiscountAndFinalPrice.vue';
import AddrsPost from '@/components/AddrsPost.vue';
import axios from 'axios';

export default {
  data() {
      return {
          paymentList: [], //구매리스트 정보
          userInfo: {}, //보내는이 정보
          deliInfo:{}, //배송지 정보
          point:0, //포인트 사용정보
          couponSelected:{}, //쿠폰정보
          finalPrice : 0, //결제금액
          checkItem : false, //약관확인
          fee : 0,  //배송비
          total_prices : 0, //총 합계(수정필요)
          couponPrice : 0 //쿠폰할인액
      };
  },
  computed:{
    phoneNum: {
      get() {
        return this.deliInfo.phone
      },
      set(newValue) {
        if(newValue.length ==11){
          this.deliInfo.phone = newValue.replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`)
        }
      }
    },
    email1: {
      get() {
        return this.deliInfo.email
      },
      set(newValue) {
            this.deliInfo.phone = newValue.split('@')
      }
    },
    //DB로 저장될 포인트 금액
    updatePoint(){
      return this.userInfo.point - this.point + 1;
    },
    //등급별 포인트 적립액
    accountPoint(){
        let persent = this.userInfo.rwd_pct;
        console.log(persent)
        return this.finalPrice * (persent /100);
      },
  },
  created() {
    //받아온 수량으로 설정
    this.paymentList = JSON.parse(sessionStorage.getItem("payList"));
    this.getUserInfo();
    if (this.paymentList == []) {
      this.$router.go(-1);
    };
  },
  mounted(){
    //결제 금액 초기화
    for(let list of this.paymentList){
      this.finalPrice += list.total_price
      this.total_prices += list.total_price
    }
    this.fee = this.total_prices >= 50000 ? 0 : 3000;
    

  },
  methods: {
      //주문 목록(수정 필요)
      async getPaymentList() {
          let result = await axios.get(`/apiproduct/cart/${this.$store.state.userStore.mem_no}`)
              .catch(err => console.log(err));
          console.log(result);
          let list = result.data;
          this.paymentList = list;
        },
        //회원정보
        async getUserInfo() {
          let result = await axios.get(`/apiuser/userInfo/${this.$store.state.userStore.mem_no}`)
          .catch(err => console.log(err));
          console.log(result);
          let list = result.data;
          this.userInfo = list;
          this.deliInfo = { ...this.userInfo }
      },
      //배송지 업데이트
      updateUser(value){
        console.log(value)
        this.deliInfo.addr = value.addrr;
        this.deliInfo.post_cd = value.zip;
      },
      //이메일 유효성 확인
      emailState(value){
        if(value.indexOf('@')==-1 && (value.indexOf('.com')==-1 || value.indexOf('.net')==-1)){
            Swal.fire("부정확한 이메일입니다. \n 정확한 이메일로 작성해주세요.");
            this.userInfo.email = '';
        }
      },
      //휴대폰번호 유효성 확인
      phoneState(value){
        const phoneRule = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;
        if(value != "" && !phoneRule.test(value)){
            Swal.fire("부정확한 휴대폰 번호입니다. \n 정확한 휴대폰 번호로 작성해주세요.");
            this.deliInfo.phone = '';
        }
      },
      //쿠폰 내역 조회
      updateSale1(value){
        this.couponSelected = value;
      },
      //포인트 내역 조회
      updateSale2(value){
        if(value == null){
          this.point=0;
        }else{
          this.point = value;
        }
      },
      // 최종결제 조회
      updateSale3(value){
        this.finalPrice = value;
      },
      //쿠폰 할인액 조회
      updateSale4(value){
        this.couponPrice = value;
      },
      //결제 처리
      async PaymentBtn(){
        //유효성검사
        if (!this.validation()) return;
        
        IMP.init("imp42374167");

        const data = {
          pg: 'html5_inicis',                         // PG사
          pay_method: 'card',                         // 결제수단
          merchant_uid: `M${new Date().getTime()}`,   // 주문번호 
          amount: this.finalPrice,                    // 결제금액  this.finalPrice
          name: '문구야 놀자',                        // 주문명
          buyer_name: this.userInfo.name,            // 구매자 이름
          buyer_tel: this.userInfo.phone,            // 구매자 전화번호
          buyer_email: this.userInfo.email,          // 구매자 이메일
          buyer_addr: this.deliInfo.addr + " " +  this.deliInfo.addrdt,  // 구매자 주소
          buyer_postcode: this.deliInfo.post_cd                      // 구매자 우편번호
        };

        const vue = this;
        IMP.request_pay(data, rsp => { // callback
          console.log(rsp);
          if (rsp.success) {
          
            //통신
            axios({
              url: '/apiorder/orderList',
              method: "post",
              headers: { "Content-Type": "application/json" },
              data:  vue.payData(rsp)

            }).then((data) => {
              // 서버 결제 API 성공시 로직
              console.log(data);
              if(data.data[1].affectedRows > 0 && data.data[5].affectedRows > 0){
                console.log("결제 성공");
                this.$router.push({path:'/completePayment', query : {"no" : data.data[0].ord_no}});
              }else{
                console.log("결제 실패");
                Swal.fire({
                  icon: "error",
                  title: "결제 실패",
                  text: "결제 확인후 다시 시도해주세요.",
                  footer: '<a href="#">관리자에게 문의해주세요</a>'
                });
                this.$router.go(-1);
              }
            })
          } else {
            console.log("결제 취소");
            this.$router.go(-1);
            // this.$router.push({path:'/'});
          }
        });
    },
    //결제시 변경될 데이터
    payData(rsp){
      const orderData = {
        "OrderTable" : {
          deli_addr : this.deliInfo.addr,
          deli_addrdt : this.deliInfo.addrdt,
          deli_cost : this.fee,
          ord_dt : this.getDate(),
          rcv_name : this.deliInfo.name,
          rcv_email : this.deliInfo.email,
          rcv_phone : this.deliInfo.phone,
          status : 1,
          total_price : this.total_prices,
          used_point : this.point,
          total_payment : this.finalPrice,
          payment_no : rsp.imp_uid,
          ord_no : rsp.merchant_uid,
          accu_pnt : this.roundNum(this.accountPoint),
          cpn_disc : this.couponPrice,
          mem_no : this.$store.state.userStore.mem_no,
          cpn_no : this.couponSelected.cpn_no,
          rcv_postcode : this.deliInfo.post_cd
        },
        "paymentList" : {
          paymentLists : this.paymentList,
          ord_no : rsp.merchant_uid
        },
        "cartList" : {
          cart_cds : this.paymentList
        },
        "userPoint" : {
            point : this.roundNum(this.userInfo.point + this.accountPoint - this.point),
            mem_no : this.$store.state.userStore.mem_no
        },
        //userInfo에 사용금액 비교 필요(등급 변경 적용기준)
        "usergrade" : {
          used_payment : this.userInfo.used_payment + this.finalPrice,
          mem_no : this.$store.state.userStore.mem_no
        },
        "usercoupon" : {
            poss_no : this.couponSelected.poss_no,
            // end_dt : this.getDate(),
            status : 1,
            cpnused_dt : this.getDate()
        }
      } 
      console.log(JSON.stringify(orderData))
      return orderData
    },
    //오늘 날짜 계산
    getDate() {
      let res = null;
      let date = new Date();
      let y = date.getFullYear();
      let m = ("0" + (date.getMonth() + 1)).slice(-2);
      let d = ("0" + date.getDate()).slice(-2);
      let h = ("0" + date.getHours()).slice(-2);
      let mi = ("0" + date.getMinutes()).slice(-2);
      let s = ("0" + date.getSeconds()).slice(-2);

      res = `${y}-${m}-${d} ${h}:${mi}:${s}`;
      
      return res;
    },
    //뒤로가기 버튼
    backBtn(){
      this.$router.go(-1);
    },
    // 소수점 자르기
    roundNum(num){
      return Math.round(num);
    },
    // 결제 유효성 검사
    validation(){
      if (this.userInfo.email == "" || this.userInfo.email == null) {
        Swal.fire("이메일을 입력해주세요.");
        this.$refs.emailFocus.focus();
        return false;
      }
      if (this.deliInfo.name == "" || this.deliInfo.name == null) {
        Swal.fire("받으시는분을 입력해주세요.");
        this.$refs.deliNameFocus.focus();
        return false;
      }
      if (this.deliInfo.post_cd == null || this.deliInfo.addr == null || this.deliInfo.addrdt == null) {
        Swal.fire("주소를 입력해주세요.");
        this.$refs.addrFocus.focus();
        return false;
      }
      if (this.deliInfo.phone == "" || this.deliInfo.phone == null) {
        Swal.fire("받으시는분의 전화번호를 입력해주세요.");
        this.$refs.deliPhoneFocus.focus();
        return false;
      }
      if(!this.checkItem){
          Swal.fire("약관에 동의해주세요.");
          this.$refs.checkTerms.focus();
          return false;
      }
      return true;
    },
    // 이미지 자르기
    imgMod(img){
      return 'img/' + img.substring(30)
    }
},
  components: { TotalOrderPrice,DiscountAndFinalPrice, AddrsPost }
}
</script>
  
<style>
.tMar30 {
    margin-top: 30px;
}
.orderNotiV21 .txtArrow {
  padding-left:10px;
  font-weight:500;
  font-size:13px;
  color:#000;
  background:url(//fiximage.10x10.co.kr/web2013/common/blt_btn_arr_red03.gif) left 8px no-repeat;
}
.orderNotiV21 .txtArrow small {
  display:block; 
  margin-top:5px; 
  font-weight:700; 
  font-size:12px; 
  color:#999;
}
.orderNotiV21 .btnMore {
  padding:0 8px 0 5px; 
  font-weight:400; 
  font-size:12px; 
  color:#888; 
  text-decoration:underline; 
  background:url(//fiximage.10x10.co.kr/web2013/common/blt08.gif) right 5px no-repeat;
}
.chkAgreeV21 label {
  display:block; 
  height:40px; 
  line-height:40px; 
  text-align:center; 
  background:#f5f5f5; 
  cursor:pointer;
}
.chkAgreeV21 input[type=checkbox] {
  margin-right:5px; 
  vertical-align:middle;
}
.tMar15 {
    margin-top: 15px;
}
.ct {
    text-align: center;
}
.bPad20 {
    padding-bottom: 20px;
}
.tPad30 {
    padding-top: 30px;
}
.btnWhite2 {
    color: #555;
    background: #fff;
    border: 1px solid #777;
}
.btnW220 {
    width: 218px;
    padding-left: 0;
    padding-right: 0;
}
.btnB2 {
    font-size: 12px;
    line-height: 13px;
    padding: 22px 45px;
}
.btn {
    display: inline-block;
    text-align: center;
    font-weight: bold;
    vertical-align: middle;
    cursor: pointer;
}
.gryArr02 {
    padding-left: 12px;
}
em {
    font-style: normal;
}
.lMar10 {
    margin-left: 10px;
}
.btnRed {
    color: #fff;
    background-color: #000;
    border-color: #000;
}

.tMar80 {
    margin: 80px 2% 0 2%;
}
.overHidden {
    overflow: hidden;
}
.cartBox h3 {
    float: left;
    color: #000;
    font-size: 12px;
}
div.orderWrap .orderForm {
    border-top: 2px solid #555;
}
.baseTable {
    border-bottom: 1px solid #eaeaea;
}
.baseTable {
    border-bottom: none;
    text-align: center;
}
caption {
    overflow: hidden;
    width: 0;
    height: 0;
    font-size: 0;
    line-height: 0;
    text-indent: -9999px;
}
.baseTable {
    border-bottom:none; 
    text-align:center;    
    width: 96%;
    margin: 0 2%;
}
.baseTable th {
    font-weight:bold;
    background:#fff; 
    font-size:13px;
}
.baseTable td {
    padding:15px 0px; 
    border-top:1px solid #eaeaea; 
    font-size:13px; 
    color:#888; 
    line-height:16px;
}
.baseTable {
    border-bottom:1px solid #eaeaea;
}
.orderForm {
    border-top:2px solid #555;
}
.orderForm th {
    background:#f5f5f5; 
    color:#666; 
    padding:12px 0px;
}
.orderForm td {
    padding:10px 0px;
}
.orderForm tbody th {
    border-top:1px solid #eaeaea; 
    font-size:12px; 
    padding-left:12px; 
    padding-right:20px; 
    text-align:left;
}
.orderForm tbody td {
    font-size:12px; 
    border-top:1px solid #eaeaea; 
    padding-left:20px; 
    padding-right:20px; 
    text-align:left;
}
.orderForm .txtInp {
    height:20px; 
    padding:0 5px; 
    font-size:12px; 
    font-weight:normal;
}
.orderForm .txtInp {
    height:15px\9; 
    padding:5px 5px 0 5px\9;
}
.orderForm select {
    height:22px; 
    font-size:12px; 
    font-weight:normal;
}
.cartBox h3 {
    float: left;
    font-size: 15px;
    color: #000;
}

</style>