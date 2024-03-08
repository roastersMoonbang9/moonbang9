<template>
<div class="cartBox tMar15">
				
                <div class="orderComplete ">
                    <p><strong><img src="http://fiximage.10x10.co.kr/web2013/inipay/txt_order_complete.gif" alt="주문이 정상적으로 완료되었습니다."></strong></p>
                    <div class="orderNumber">
                        <strong>[주문번호] {{ ord_no }}</strong>
                        
                    </div>
                </div>

                <div class="overHidden tMar80">
                    <h3>결제 정보 확인</h3>
                </div>
                <table class="baseTable orderForm payForm tMar10">
                    <caption>결제 정보 확인</caption>
                    <colgroup>
                        <col width="14%"><col width="36%"><col width="14%"><col width="">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>결제 방법</th>
                        <td>카드결제</td>
                        <th>주문일시</th>
                        <td>{{ getDate(orderList.ord_dt) }}</td>
                    </tr>
                    <tr>
                        <th>입금자명</th>
                        <td>{{userInfo.name}}</td>
                        <th>결제 금액</th>
                        <td>
                            <strong class="crRed">{{ orderList.total_payment }}원</strong>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div class="overHidden tMar55 tMar80">
                    <h3>주문리스트 확인</h3>
                </div>
                <table class="baseTable tMar10 orderForm">
                    <caption>주문리스트</caption>
                    <colgroup>
                        <col width="120px"><col width="55px"><col width=""><col width="110px"><col width="80px"><col width="95px">
                    </colgroup>
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
                        <tr  v-for="(list, idx) in paymentList" v-bind:key="idx">
                            <td>{{list.prdt_cd}}</td>
                            <td><img src="http://webimage.10x10.co.kr/image/small/606/S006060421.jpg" width="50px" height="50px" alt="01-Custard [커스터드]"></td>
                            <td class="lt"><p class="tPad05">{{list.prdt_name}}</p><p class="tPad02" v-if="list.opt_name != null">옵션 : {{list.opt_name}}</p></td>
                            <td> {{list.sale_price}}원 </td>
                            <td> {{ list.cart_qty }}개 </td>
                            <td>{{list.total_price}}원 </td>
                        </tr>
                    </tbody>
                </table>
                <!-- 총 주문금액 컴포넌트 자리-->
                <TotalOrderPrice v-bind:list="paymentList" v-bind:usedPoint="orderList.used_point" v-bind:usedCoupon="orderList.cpn_disc" v-bind:payTotal="orderList.total_payment"/>

                <div class="overHidden tMar55 tMar80">
                    <h3>주문고객 정보 확인</h3>
                </div>
                <table class="baseTable orderForm tMar10">
                    <caption>주문고객 정보 확인</caption>
                    <colgroup>
                        <col width="12%"><col width="38%"><col width="12%"><col width="">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>보내시는 분</th>
                        <td>{{userInfo.name}}</td>
                        <th>이메일</th>
                        <td>{{userInfo.email}}</td>
                    </tr>
                    <tr>
                        <th>휴대전화</th>
                        <td>{{userInfo.phone}}</td>
                    </tr>
                    </tbody>
                </table>
                
                            <div class="overHidden tMar55 tMar80">
                                <h3>배송지 정보 확인</h3>
                            </div>
                            
                            <table class="baseTable orderForm tMar10">
                                <caption>배송지 정보 확인</caption>
                                <colgroup>
                                    <col width="12%"><col width="38%"><col width="12%"><col width="">
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th>받으시는 분</th>
                                    <td colspan="3">{{ orderList.rcv_name }}</td>
                                </tr>
                                <tr>
                                    <th>휴대전화</th>
                                    <td>{{ orderList.rcv_phone }}</td>
                                </tr>
                                <tr>
                                    <th>주소</th>
                                    <td colspan="3">[{{ orderList.rcv_postcode }}] {{ orderList.deli_addr }} {{ orderList.deli_addrdt }}</td>
                                </tr>
                                </tbody>
                            </table>
                            
                <div class="ct tMar60 bPad20">
                    
                    <button class="btn btnB2 btnWhite2 btnW220" @click="homeBtn()">쇼핑 계속하기</button>
                    <button class="lMar10 btn btnB2 btnRed btnW220" @click="mypageBtn()"><em class="whiteArr02">나의 주문내역 확인</em></button>
                    
                </div>
            </div>
</template>
<script>
import TotalOrderPrice from '@/components/totalOrderPrice.vue';
import axios from 'axios';

export default{ 
    data(){
        return{
            paymentList: [], //구매리스트 정보
            userInfo: {}, //보내는이 정보
            deliInfo : {}, //받는이 정보
            ord_no : "", //주문번호
            orderList : {} //주문목록
        };
    },
    created(){
        this.paymentList = JSON.parse(sessionStorage.getItem("payList"));
        this.getUserInfo();
        if (this.paymentList == []) {
            this.$router.go(-1);
        };
        this.ord_no = this.$route.query.no;
    },
    mounted(){
        this.getPaymentList();
    },
    methods:{
        //회원정보
        async getUserInfo() {
          let result = await axios.get(`/apiuser/userInfo/${this.$store.state.userStore.mem_no}`)
          .catch(err => console.log(err));
          console.log(result);
          let list = result.data;
          this.userInfo = list;
          this.deliInfo = { ...this.userInfo }
        },
        //주문정보 확인
        async getPaymentList() {
          let result = await axios.get(`/apiorder/memOrderList/${this.ord_no}`)
              .catch(err => console.log(err));
          let list = result.data[0];
          console.log(list)
          this.orderList = list;
        },
        //날짜 양식변경
        getDate(days) {
            console.log(days)
            let res = null;
            let date = new Date(days);
            let y = date.getFullYear();
            let m = ("0" + (date.getMonth() + 1)).slice(-2);
            let d = ("0" + date.getDate()).slice(-2);
            let h = ("0" + date.getHours()).slice(-2);
            let mi = ("0" + date.getMinutes()).slice(-2);
            let s = ("0" + date.getSeconds()).slice(-2);

            res = `${y}년${m}월${d}일 ${h}:${mi}:${s}`;

        return res;
        },
        //메인가기 버튼
        homeBtn(){
            this.$router.push({path:'/'});
        },
        //마이페이지 이동 버튼
        mypageBtn(){
            this.$router.push({path:'/'});
        }
    },
    components: { TotalOrderPrice }
}
</script>

<style>
.tMar15 {
    margin-top: 15px;
}
.cartBox {
    background: #fff;
    padding: 35px 20px;
}
.orderComplete {
    padding-top: 20px;
    margin-bottom: 53px;
    text-align: center;
    font-size: 13px;
}
.orderComplete .orderNumber {
    width: 560px;
    height: 31px;
    margin: 19px auto 15px;
    padding-top: 10px;
    background: url(//fiximage.10x10.co.kr/web2013/common/bg_ribon.gif) left top no-repeat;
    color: #fff;
    font-size: 14px;
}
.orderComplete .orderNumber strong {
    padding: 0 15px;
}
.overHidden {
    overflow: hidden;
}
.cartBox h3 {
    float: left;
    font-size: 15px;
    color: #000;
}
table.payForm {
    border-top:2px solid #000;
}
table.payForm thead td {
    color:#666; 
    text-align:left; 
    padding-left:20px; 
    padding-top:15px; 
    padding-bottom:15px;
}
table.payForm thead td span {
    padding-right:30px;
}
table.payForm tbody td {
    padding-right:10px; 
    font-weight:normal;
}
.baseTable {
    border-bottom:none; 
    text-align:center;
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
    padding-left:20px; 
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