<template>
    <div class="overHidden tMar60">
        <div class="ftLt">
            <div class="overHidden" style="float: left; margin-right: 10rem;">
            <div class="overHidden" style="margin: 0 2%;">
                <h3>할인 정보</h3>
            </div>
            <table class="baseTable orderForm payForm tMar10" style="width:690px">
                <caption>할인 정보 입력</caption>
                <colgroup>
                    <col width="95px">
                    <col width="315px">
                    <col width="">
                </colgroup>
                <tbody>
                    <tr>
                        <th width="95px" class="nowrap">
                                <label for="bonusCp">상품쿠폰</label></th>
                        <td width="315px">
                            <select name="sailcoupon" class="select offInput" title="보너스 쿠폰 선택하세요" style="width:310px;" v-model="selected">
                                <option value="">없음</option>
                                <option v-for="(list, idx) in couponList" :key="idx" :value="list">{{ list.cpn_name }}</option>
                            </select>
                        </td>
                        <td><span class="cmt02 cr555 nowrap">적용가능 보너스 쿠폰 : <strong>{{ couponList.length }}</strong>장</span></td>
                    </tr>
                    <tr>
                        <th width="95px" class="nowrap"><label for="mileage">포인트</label></th>
                        <td width="315px">
                            <p><input name="spendmileage" v-model="newPoint" @input="setPoint()" type="number" class="txtInp"
                                    style="width:75px;" id="mileage"> Point</p>
                                    <p>포인트는 한번에 최대 10000포인트까지 사용가능합니다.</p>
                        </td>
                        <td>
                            <p>보유 포인트 : {{ point }}점</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <input type="hidden" name="availitemcouponlist" value="">
            <input type="hidden" name="checkitemcouponlist" value="">
        </div>
    </div>
    <div class="ftLt" style="width:340px">
        <div class="overHidden" style="margin: 0px 2%;">
            <h3>결제 금액</h3>
        </div>
        <div class="payForm" style="margin: 0px 2%;">
            <table style="width: 100%;">
                <caption>결제 금액 보기</caption>
                <colgroup>
                    <col width="50%">
                    <col width="">
                </colgroup>
                <tbody>
                    <tr>
                        <th>총 주문금액</th>
                        <td>{{ totalPrices }}원</td>
                    </tr>
                    <tr>
                        <th>배송비</th>
                        <td><span id="DISP_DLVPRICE">{{fee}}</span>원</td>
                    </tr>
                    <tr>
                        <th>상품쿠폰 사용</th>
                        <td><span class="crRed"><span id="DISP_SAILCOUPON_TOTAL">{{usedCoupon}}</span>원</span></td>
                    </tr>
                    <tr>
                        <th>포인트 사용</th>
                        <td><span class="crRed"><span id="DISP_SAILCOUPON_TOTAL">{{usedPoint}}</span>원</span></td>
                    </tr>
                    <tr class="midMilieage"><!--midTotal-->
                        <th><strong class="fs13">구매 확정액</strong></th>
                        <td><span class="crRed"><em class="fs18"><span id="DISP_FIXPRICE">{{totalPayment}}</span></em>원</span></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th><strong class="fs13">최종 결제액</strong></th>
                        <td><span class="crRed"><em class="fs20"><span id="DISP_SUBTOTALPRICE">{{totalPayment}}</span></em>원</span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'

export default {
    props:{
        list: {
        type: Object
        },
        point : Number,
        fee : Number
    },
    emits:['selected','newPoint','finalPrice']
    ,data() {
        return {
            couponList:[],
            selected:{},
            newPoint:0,
            couponPrice:0
        };
    },
    created() {
        this.getCouponList();
    },
    watch:{
        selected(){
            this.$emit('selected',this.selected);
        },
        totalPayment(){
            this.$emit('finalPrice',this.totalPayment);
        },
        usedCoupon(){
            this.$emit('couponPrice',this.usedCoupon);
        }
    },
    updated(){
        this.$emit('newPoint',this.newPoint)
    },
     computed:{
        totalPrices(){
            let totalPrice = 0;
            for(let i=0; i<this.list.length;i++){
                totalPrice += this.list[i].total_price;
            }
            return totalPrice;
        },
        totalSum(){
            return this.totalPrices + this.fee;
        },
        usedCoupon(){
            if(this.selected.dc_pct > 0 && this.selected.dc_price > 0){
                return (this.totalSum  - (this.totalSum * (this.selected.dc_pct / 100))) < (this.totalSum - this.selected.dc_price) ? this.selected.dc_price : (this.totalSum * (this.selected.dc_pct / 100));
            }else if(this.selected.dc_pct > 0 || this.selected.dc_pct != undefined){
                return (this.totalSum * (this.selected.dc_pct / 100));
            }else if(this.selected.dc_price > 0 || this.selected.dc_price != undefined){
                return this.selected.dc_price;
            }else{
                return 0
            }
        },
        usedPoint(){
            return this.newPoint;
        },
        totalPayment(){
            return this.totalSum - this.usedCoupon - this.usedPoint;
        }
    },
    methods: {
        async getCouponList(){
          let result = await axios.get(`/apiuser/getcoupon/${this.$store.state.userStore.mem_no}/0`)
              .catch(err => console.log(err));
          let list = result.data;
          this.couponList = list;
        },
        setPoint(){
            if(this.newPoint < 10000){
                alert('보유포인트의 최대값을 넘게 사용할 수 없습니다.')
                this.newPoint = 10000
            }
            if(this.newPoint > this.point){
                alert('보유포인트의 최대값을 넘게 사용할 수 없습니다.')
                this.newPoint = this.point
            }else if(this.newPoint < 0){
                alert('포인트 사용값은 0이하로 내려갈 수 없습니다.')
                this.newPoint = 0
            }
        }
    }
}
</script>

<style>
.overHidden {
    overflow: hidden;
}
.tMar60 {
    margin-top: 60px;
    width: 98%;
    margin: 60px auto;
}
.ftLt {
    float: left;
}
.payForm {
    border-top:2px solid #d50c0c;
}
.payForm thead td {
    color:#666;
    text-align:left;
    padding-left:20px; 
    padding-top:15px; 
    padding-bottom:15px;
}
.payForm thead td span {
    padding-right:30px;
}
.payForm tbody td {
    padding-right:10px; 
    font-weight:normal;
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
input.radio {
    vertical-align: middle;
    margin-top: -3px;
}
.cmt02 {
    background: url(//fiximage.10x10.co.kr/web2013/common/blt_btn_arr_red03.gif) left 4px no-repeat;
    padding-left: 10px;
}
.cr555 {
    color: #555;
}
.lPad20 {
    padding-left: 20px;
}
.tPad30 {
    padding-top: 30px;
}
.note01 dt {
    color: #666;
}
.fs13 {
    font-size: 13px;
}
.note01 dd {
    padding: 15px 5px;
}
.list01 li {
    background: url(//fiximage.10x10.co.kr/web2013/common/blt_btn_arr_red03.gif) left 6px no-repeat;
    padding-left: 10px;
}
.ftRt {
    float: right;
}
.cartBox h3 {
    float: left;
    font-size: 15px;
    color: #000;
}
.crRed {
    color: #d50c0c;
}
div.orderWrap div.payForm {
    background: #f5f5f5;
    border-top: 2px solid #d50c0c;
    padding: 0 10px;
}
.tMar10 {
    margin-top: 10px;
}
.payForm {
    background:#f5f5f5; 
    border-top:2px solid #000; 
    padding:0 10px;
}
.payForm th, .payForm td {
    border-bottom:1px solid #eaeaea; 
    padding-top:12px; 
    padding-bottom:12px; 
    color:#555;
}
.payForm th {
    font-size:13px; 
    text-align:left; 
    font-weight:normal; 
    padding-left:10px;
}
.payForm td {
    font-size:13px; 
    text-align:right; 
    font-weight:bold; 
    padding-right:10px;
}
.payForm tfoot th, .payForm tfoot td {
    padding-top:30px; 
    padding-bottom:30px;
    border-bottom:none;
}
.payForm tr.midTotal th, .payForm tr.midTotal td {
    border-bottom:none; 
    padding-top:15px; 
    padding-bottom:0; 
    color:#555;
}
.payForm tr.midMilieage th, .payForm tr.midMilieage td {
    border-bottom:1px solid #eaeaea; 
    padding-top:12px; 
    padding-bottom:40px; 
    color:#555;
}
input::-webkit-inner-spin-button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}
</style>