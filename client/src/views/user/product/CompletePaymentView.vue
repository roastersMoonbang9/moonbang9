<template>
<div class="cartBox tMar15">
				
                <div class="orderComplete ">
                    <p><strong><img src="http://fiximage.10x10.co.kr/web2013/inipay/txt_order_complete.gif" alt="주문이 정상적으로 완료되었습니다."></strong></p>
                    <div class="orderNumber">
                        <strong>[주문번호] 24030760735</strong>
                        
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
                        <td>무통장</td>
                        <th>주문일시</th>
                        <td>2024-03-07 오전 10:34:45</td>
                    </tr>
                    <tr>
                        <th>입금 예정자명</th>
                        <td>최승민</td>
                        <th>결제 금액</th>
                        <td>
                            <strong class="crRed">7,900원</strong>
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
                    
                        <tr>
                            <td>6060421</td>
                            <td><img src="http://webimage.10x10.co.kr/image/small/606/S006060421.jpg" width="50px" height="50px" alt="01-Custard [커스터드]"></td>
                            <td class="lt">
                                <p class="tPad05">플랫 포켓 스케줄러 (6개월)</p>
                                <p class="tPad02">
                                01-Custard [커스터드]
                                </p>
                            </td>
                            
                                <td>
                                    5,400원
                                </td>
                            
                                <td>
                                    1
                                </td>
                                <td>5,400원
                                </td>
                            
                        </tr>


                        
                    </tbody>
                </table>
                <!-- 총 주문금액 컴포넌트 자리-->
                <TotalOrderPrice v-bind:list="paymentList"/>

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
                        <td>파란강아지</td>
                        <th>이메일</th>
                        <td>dmg04144@naver.com</td>
                    </tr>
                    <tr>
                        <th>휴대전화</th>
                        <td>010-3626-3631</td>
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
                                    <td colspan="3">파란강아지</td>
                                </tr>
                                <tr>
                                    <th>휴대전화</th>
                                    <td>010-3626-3631</td>
                                </tr>
                                <tr>
                                    <th>주소</th>
                                    <td colspan="3">[42960] 대구광역시 달성군 화원읍 명천로 243 (명곡역미래빌5단지)506/604</td>
                                </tr>
                                </tbody>
                            </table>
                            
                <div class="ct tMar60 bPad20">
                    
                    <button class="btn btnB2 btnWhite2 btnW220">쇼핑 계속하기</button>
                    <button class="lMar10 btn btnB2 btnRed btnW220"><em class="whiteArr02">나의 주문내역 확인</em></button>
                    
                </div>
            </div>
</template>
<script>
import TotalOrderPrice from '@/components/totalOrderPrice.vue';

export default{ 
    data(){
        return{
            paymentList: []
        };
    },
    created(){
        this.paymentList = JSON.parse(sessionStorage.getItem("payList"));
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
    border-top:2px solid #d50c0c;
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