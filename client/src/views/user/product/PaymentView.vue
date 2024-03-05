<template>
    <div>
        <h1>주문결제</h1>
    </div>
    <section class="py-5">
          <h2 class="h5 text-uppercase mb-4"><span class="bg-light" style="float: left;padding: 0 10px;">주문리스트 확인</span></h2>
          <div class="row" style="display: block;">
            <div class="mb-4 mb-lg-0" style="margin: 0 auto;">
              <!-- CART TABLE-->
              <div class="table-responsive mb-4">
                <table class="table text-nowrap">
                  <thead class="bg-light">
                    <tr>
                      <th class="border-0 p-3" scope="col"> <strong class="text-sm text-uppercase">상품코드</strong></th>
                      <th class="border-0 p-3" scope="col"> <strong class="text-sm text-uppercase">상품정보</strong></th>
                      <th class="border-0 p-3" scope="col"> <strong class="text-sm text-uppercase">판매가격</strong></th>
                      <th class="border-0 p-3" scope="col"> <strong class="text-sm text-uppercase">수량</strong></th>
                      <th class="border-0 p-3" scope="col"> <strong class="text-sm text-uppercase">주문금액</strong></th>
                      <th class="border-0 p-3" scope="col"> <strong class="text-sm text-uppercase"></strong></th>
                      <th class="border-0 p-3" scope="col"> <strong class="text-sm text-uppercase"></strong></th>
                      <th class="border-0 p-3" scope="col"> <strong class="text-sm text-uppercase"></strong></th>
                    </tr>
                  </thead>
                  <tbody class="border-0">
                    <tr v-for="(list, idx) in paymentList" v-bind:key="idx">
                      <th class="border-0 p-3" scope="col"><strong class="text-sm text-uppercase">{{list.prdt_cd}}</strong></th>
                      <th class="ps-0 py-3 border-light" scope="row">
                        <div class="d-flex align-items-center"><a class="reset-anchor d-block animsition-link" href="detail.html"><img src="../../../assets/product-detail-3.jpg" alt="..." width="70"/></a>
                          <div class="ms-3"><p class="mb-0 small">{{list.prdt_name}}</p><p class="mb-0 small" v-if="list.opt_name != null">옵션 : {{list.opt_name}}</p></div>
                        </div>
                      </th>
                      <td class="p-3 align-middle border-light">
                        <p class="mb-0 small">{{list.sale_price}}</p>
                      </td>
                      <td class="p-3 align-middle border-light">
                            {{ list.cart_qty }}
                      </td>
                      <td class="p-3 align-middle border-light">
                        <p class="mb-0 small">{{list.total_price}}</p>
                      </td>
                      <td class="p-3 align-middle border-light"><a class="reset-anchor" href="#!"><i class="fas fa-trash-alt small text-muted"></i></a></td>
                      <td class="p-3 align-middle border-light"></td>
                      <td class="p-3 align-middle border-light"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
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
                <input type="text" class="txtInp" name="buyemail_Pre" title="이메일 아이디 입력" style="width:120px;" v-model="userInfo.email" @change="emailState(userInfo.email)">
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
            <td><input type="text" class="txtInp" name="buyname" maxlength="32" v-model="deliInfo.name" id="sendName"></td>
        </tr>
        <tr>
            <th>주소</th>
            <td colspan="3">
                <!--주소 컴포넌트-->
                <p>
                  <input type="text" name="buyZip" v-model='deliInfo.post_cd' readonly title="우편번호" class="txtInp focusOn" style="width:100px; margin-right:1rem;">
                  <AddrsPost v-on:userEvent="updateUser"/>
    </p>
    <p class="tPad05">
        <input name="buyAddr1" type="text" class="txtInp" style="width:420px;" v-model='deliInfo.addr' title="동까지의 주소 입력" readonly>
    </p>
                <p><input name="buyAddr2" type="text" class="txtInp" style="width:440px;" v-model="deliInfo.addrdt" title="상세주소 입력" @change="detailAddr"></p>
            </td>
        </tr>
        {{ addrs }}
        <tr>
            <th><label for="hp01">휴대전화</label></th>
            <td>
                <p>
                  <input type="text" class="txtInp" name="buyhp1" v-model="phoneNum" title="주문고객 휴대전화번호 국번 입력" maxlength="11" id="hp01">
                </p>
                </td>
        </tr>
        </tbody>
    </table>
    {{ userInfo }}
        <!--주문 할인정보 및 결제내역확인 컴포넌트-->
        <DiscountAndFinalPrice v-bind:list="paymentList" v-bind:point="userInfo.point" :pointEvent="updateSale" :couponEvent="updateSale2"/>
        
        <div class="orderNotiV21 tMar30">
            <p class="txtArrow">품절 발생 시 별도의 연락을 하지 않고 선택하신 결제 방법으로 안전하게 환불해 드립니다.</p>
            <p class="txtArrow tMar15">
                주문 진행을 위해 다음의 판매자(제3자)에게 개인정보를 제공합니다.
            </p>
            <div class="chkAgreeV21 tMar30"><label for="agreeAll"><input type="checkbox" id="agreeAll">모든 내용을 확인하였으며 구매조건에 동의합니다.</label></div>
					</div>

          <div class="ct tPad30 bPad20" id="nextbutton1" name="nextbutton1" style="display: flex;justify-content: center;">
						<a href="http://www.10x10.co.kr/inipay/ShoppingBag.asp" class="btn btnB2 btnWhite2 btnW220"><em class="gryArr02">이전 페이지</em></a>
						<a href="#" name="btnPay" id="btnPay" class="lMar10 btn btnB2 btnRed btnW220">결제하기</a>
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
          paymentList: [],
          userInfo: {},
          deliInfo:{},
          point:0,
          couponSelected:{}
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
    }
  },
  created() {
    //받아온 수량으로 설정
    this.paymentList = JSON.parse(sessionStorage.getItem("payList"));
    this.getUserInfo();
    if (this.paymentList == []) {
      this.$router.go(-1);
    };
    // this.emails = this.userInfo.email.split('@');
  },
  mounted(){

  },
  methods: {
      //주문 목록(수정 필요)
      async getPaymentList() {
          let result = await axios.get('/apiproduct/cart/1')
              .catch(err => console.log(err));
          console.log(result);
          let list = result.data;
          this.paymentList = list;
      },
      //회원정보
      async getUserInfo() {
            let result = await axios.get('/apiuser/userInfo/1')
                .catch(err => console.log(err));
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
      //쿠폰 및 포인트 내역 조회
      updateSale(value){
        this.point = value.point;
      },
      updateSale2(value){
        this.couponSelected = value.coupon;
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
    background: #d50c0c;
    border: 1px solid #d50c0c;
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
</style>