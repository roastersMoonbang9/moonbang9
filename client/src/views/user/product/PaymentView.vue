<template>
    <div>
        <h1>주문결제</h1>
        {{ paymentList }}
        {{ userInfo }}
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
        <!--주문고객정보,배송지정보 컴포넌트-->
        <OrderCustomerInfo :userInfo="userInfo" @userEvent="updateUser"/>
        {{ userInfo }}
        <!--주문 할인정보 및 결제내역확인 컴포넌트-->
        <DiscountAndFinalPrice v-bind:list="paymentList"/>
        
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
import OrderCustomerInfo from '@/components/OrderCustomerInfo.vue';
import TotalOrderPrice from '@/components/totalOrderPrice.vue';
import DiscountAndFinalPrice from '@/components/DiscountAndFinalPrice.vue';
import axios from 'axios';

export default {
  data() {
      return {
          paymentList: [],
          userInfo: {}

      };
  },
  created() {
    //받아온 수량으로 설정
    this.paymentList = JSON.parse(this.$route.query.payList);
   this.getUserInfo();
    if (this.paymentList == []) {
      this.$router.go(-1);
    }
  },
  computed: {
      
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
      },
      //배송지 업데이트
      updateUser(value){
        console.log(value)
        this.userInfo.addr = value.addr;
        this.userInfo.addrdt = value.addrdt;
        this.userInfo.post_cd = value.post_cd;
      }
    },
  components: { TotalOrderPrice, OrderCustomerInfo,DiscountAndFinalPrice }
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

</style>