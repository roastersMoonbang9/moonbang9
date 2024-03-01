<template>
    <div class="totalBox tMar30">
        <dl class="totalPriceView">
            <dt><img src="http://fiximage.10x10.co.kr/web2013/cart/txt_total.gif" alt="총 주문 금액"></dt>
            <dd id="lyrTotalItem">
                <ul class="priceList">
                    <li>
                        <span class="ftLt">상품 총 금액</span><strong class="ftRt">{{ totalPrices }}원</strong>
                    </li>
                    <li>
                        <span class="ftLt">배송비</span><strong class="ftRt">{{fee}}원</strong>
                    </li>
                </ul>
            </dd>
        </dl>
        <p class="rt tPad15 bPad05" id="lyrTotalOrder">
            <strong class="lPad10">

                결제 예정 금액 <span class="crRed lPad10"><em class="fs20">
                    {{totalSum}}</em>원</span>
            </strong>
        </p>
    </div>
</template>
<script>
export default {
    props: ['list'],
    data() {
        return {
            totalPrice:0
        };
    },
    computed :{
        totalPrices(){
            let totalPrice = 0;
            for(let i=0; i<this.list.length;i++){
                totalPrice += this.list[i].total_price;
            }
            return totalPrice;
        },
        fee(){
            return this.totalPrices >= 50000 ? 0 : 3000;
        },
        totalSum(){
            return this.totalPrices + this.fee;
        }
    },
    created() { },
    methods: {
        
    }
}
</script>

<style>
.tMar30 {
    margin:30px;
}
.totalBox {
    border: 4px solid #999;
    background: #fff;
    padding: 15px;
    font-weight: normal;
}
.totalPriceView {
    overflow:hidden; 
    padding-bottom:25px; 
    border-bottom:1px dashed #a1a1a1;
}
.totalPriceView dt {
    float:left; 
    padding-top:5px;
}
.totalPriceView dd {
    float:right; 
    width:315px;
}
.priceList li {
    overflow:hidden; 
    font-size:14px; 
    border-bottom:1px solid #eaeaea; 
    padding:3px 0; 
    margin-bottom:5px;
}
.rt {
    text-align:right;
}
.crRed {
    color:#d50c0c;
}
.lPad10 {
    padding-left:10px;
}
.ftLt {
    float:left;
}
.ftRt {
    float:right;
}
.fs20 {
    font-size:20px;
}
</style>