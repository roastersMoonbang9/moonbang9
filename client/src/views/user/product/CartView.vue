<template>
<div class="cartWrap">
    <div>
        <h3 class="overHidden cartt tMarj2" id="bagGrpTitle0">장바구니</h3>
    </div>
    <table class="baseTable tMar10" id="bagGrpItem0">
		<caption>장바구니 목록(텐바이텐 배송 상품)</caption>
		<colgroup>
			<col width="35px"><col width="70px"><col width="90px"><col width="55px"><col width="110px"><col width=""><col width="80px"><col width="95px"><col width="95px"><col width="90px"><col width="100px">
		</colgroup>
	<thead>
		<tr>
			<th><input type="checkbox" name="chk_item3" v-model="selectAll"></th>
			<th></th>
			<th>상품코드</th>
			<th></th>
			<th colspan="2">상품정보</th>
			<th>판매가격</th>
			<th>수량</th>
			<th>주문금액</th>
			<th></th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		<tr mix="3" v-for="(list, idx) in cartList" v-bind:key="idx">
			<td class="rt"><input type="checkbox" name="chk_item" v-model="selected" :key="idx" :value="list"></td>
			<td></td>
			<td>{{list.prdt_cd}}</td>
      <td></td>
			<td><img src="http://webimage.10x10.co.kr/image/small/558/S005586306-3.jpg" width="50px" height="50px"></td>
			<td class="lt">
				<p class="tPad05 cnt">{{list.prdt_name}}</p>
				<p class="tPad02" v-if="list.opt_name != null"><strong>옵션</strong> : {{list.opt_name}}</p>
			</td>
			<td>
						<p class="txtML cr999 cnt">{{list.price}}원</p>
						<p class="crRed" v-if="list.price != list.sale_price"><strong>{{list.sale_price}}원</strong></p>
			</td>
			<td>
				<p class="cnt">
				<input name="itemea" class="txtInp ct" min="1" type="number" :value="list.cart_qty" :key="idx" @input="cartQty($event,idx)" style="-moz-appearance: textfield; width:30px;">
				<span class="orderNumAtc">
					<span><img src="http://fiximage.10x10.co.kr/web2013/common/btn_num_up.png" alt="갯수 더하기" @click="addQty(idx)" style="cursor:pointer"></span>
					<span class="tPad02"><img src="http://fiximage.10x10.co.kr/web2013/common/btn_num_down.png" alt="갯수 빼기" @click="minusQty($event,idx)" style="cursor:pointer"></span>
				</span>
				</p>
				<p class="tPad03"><button type="button" class="btn btn-secondary btn btnS3 btnGry2 fn" style="width:41px;" @click="modCartQty(list)">수정</button></p>
			</td>
				<td>{{list.total_price}}원</td>
				<td></td>
			
			<td class="rt">
				<p><button type="button" class="btn btn-secondary btn btnS3 btnRed btnW70 fn" @click="goToPayment([list])">바로 주문</button></p>
				<p class="tPad03"><button type="button" class="btn btn-secondary btn btnS3 btnGry2 btnW70 fn" @click="delCartInfo(list,idx)"><em class="btnDel">삭제</em></button></p>
			</td>
		</tr>
		</tbody>

		<tfoot>
		<tr>
			<td colspan="11" id="grpTot3" value="텐바이텐 배송 상품">
				<button type="button" class="btn btn-secondary btn btnWhite2 btnW185 sece" @click="delCartList()">선택삭제</button>
			</td>
		</tr>
		</tfoot>
	</table>
        <!--주문금액 컴포넌트-->
        <TotalOrderPrice v-bind:list="selected"/>

        <div class="overHidden tPad20 bPad20">
          <div class="ftRt">
          <button type="button" class="btn btn-secondary btn btnB1 btnWhite2 btnW185 lMar10" @click="goToback()">계속 쇼핑하기</button>
          <button type="button" class="btn btn-secondary btn btnB1 btnWhite2 btnW185 lMar10" @click="goToPayment(selected)">선택상품 주문하기</button>
          <button type="button" class="btn btn-danger btn btnB1 btnRed btnW185 lMar10" @click="goToPayment(cartList)">전체상품 주문하기</button>
          </div>
        </div>
        </div>
  </template>
  
  <script>
  import TotalOrderPrice from '@/components/totalOrderPrice.vue';
  import axios from 'axios';

  export default {
    data() {
        return {
            cartList: [],
            selected: []
        };
    },
    created() {
        this.getCartList();
    },
    computed: {
        selectAll: {
          get() {
                return this.selected.length === this.cartList.length;
            },
            set(value) {
                this.selected = value ? this.cartList : [];
            }
        },
    },
    methods: {
        //장바구니 목록
        async getCartList() {
            let result = await axios.get(`/apiproduct/cart/${this.$store.state.userStore.mem_no}`)
                .catch(err => console.log(err));
            console.log(result);
            let list = result.data;
            this.cartList = list;
        },
        // 장바구니 선택삭제
        async delCartList() {
            for (let i of this.selected) {
                let result = await axios.delete('/apiproduct/cart/' + i.cart_cd)
                    .catch(err => console.log(err));
                for (let j = 0; j < this.cartList.length; j++) {
                    if (i.cart_cd == this.cartList[j].cart_cd) {
                        this.cartList.splice(j, 1);
                    }
                }
                console.log(result);
            }
        },
        // 장바구니 수량수정
        async modCartQty(lists) {
            let method = 'put';
            let url = `/apiproduct/cart/` + lists.cart_cd;
            let data = {
                "param": {
                    "cart_qty": lists.cart_qty
                }
            };
            let sendInfo = { method, url, data };
            console.log(lists);
            let result = await axios(sendInfo)
                .then(res => {
                if (res.data.affectedRows != 0) {
                    Swal.fire({
                        position: "center-center",
                        icon: "success",
                        title: "상품의 수량이 변경되었습니다.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
                .catch(err => console.log(err));
            setTimeout(() => {
                this.$router.go(0);
            }, 1000);
        },
        //직접입력 수량 변경
        cartQty(event, idx) {
            if (event.target.value < 1) {
                this.cartList[idx].cart_qty = 1;
                event.target.value = 1;
            }
            else {
                this.cartList[idx].cart_qty = event.target.value;
            }
        },
        //단건삭제
        async delCartInfo(lists, idx) {
            let result = await axios.delete('/apiproduct/cart/' + lists.cart_cd)
                .catch(err => console.log(err));
            console.log(result);
            this.cartList.splice(idx, 1);
        },
        //음수 제한
        minusQty(event, idx) {
            if (this.cartList[idx].cart_qty <= 1) {
                this.cartList[idx].cart_qty = 1;
                event.target.value = 1;
            }
            else {
                this.cartList[idx].cart_qty--;
                // this.cartList[idx].total_price = this.cartList[idx].total_price - this.cartList[idx].sale_price;
            }
        },
        //더하기
        addQty(idx) {
                this.cartList[idx].cart_qty++;
                // this.cartList[idx].total_price = this.cartList[idx].total_price + this.cartList[idx].sale_price;
        },
        //결제페이지 이동
        goToPayment(payList) {
          if (payList.length == 0) {
            Swal.fire("선택된 상품이 없습니다.");
          } else {
            sessionStorage.setItem("payList", JSON.stringify(payList ));
            this.$router.push({ name: 'payment'});
          }
        },
        //뒤로가기
        goToback() {
            this.$router.go(-1);
        }
    },
    components: { TotalOrderPrice }
}
  </script>
    
  <style>
  .lMar10 {
    margin-left: 10px;
    margin-top: 3rem;
  }
  .bPad20 {
    padding-bottom: 20px;
    margin: 30px;
  }
  
  .tPad20 {
    padding-top: 20px;
  }
  .ftRt {
    float: right;
  }
  .btnW185 {
    width: 183px;
    padding-left: 0;
    padding-right: 0;
  }
  
  .btnB1 {
    font-size: 13px;
    line-height: 13px;
    padding: 18px 36px;
  }
  .sece{
    width: 130px;
    border-radius: 20px;
    padding: 14px 36px;
    font-size: 13px;
    line-height: 13px;
  }
  .cartt{
    margin-left: 3rem;
    margin-bottom: 1rem;
  }
  .cartWrap .baseTable {
    border-bottom: none;
    text-align: center;
}
.baseTable {
    border-top: 2px solid #555;
    border-bottom: 1px solid #ddd;
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
.cartWrap .baseTable th {
  font-weight:bold; 
  background:#fff; 
  font-size:13px;
}
.cartWrap .baseTable td {
  padding:15px 0px; 
  border-top:1px solid #eaeaea; 
  font-size:13px; 
  color:#888; 
  line-height:16px;
}
.cartWrap .baseTable thead th {
  padding:7px 0; 
  border-bottom:1px solid #ccc; 
  color:#888;
}
.cartWrap .baseTable td.rt {
  padding-left:10px; 
  padding-right:10px;
}
.cartWrap .baseTable tfoot {
  background:#f7f7f7; 
  color:#000; 
  text-align:left;
}
.cartWrap .baseTable tfoot td {
  padding:15px 10px; 
  font-size:12px; 
  height:35px;
}
.cartWrap .baseTable tr.orderWord td {
  border-top:1px dashed #e4e4e4; 
  padding:10px 0;
}
.cartWrap .baseTable tr.orderWord td.bdrNone {
  border-top:none;
}
.cartWrap .baseTable tr.orderWord td.rt {
  padding:13px 10px;
}
.cartWrap .baseTable .txtInp {
    height: 18px;
    padding: 0 5px;
    font-size: 11px;
}
.ct {
    text-align: center;
}
.orderNumAtc {
    display: inline-block;
    vertical-align: top;
    width: 13px;
    height: 20px;
}
.orderNumAtc span {
    display: block;
    width: 13px;
    height: 9px;
    vertical-align: top;
}
.orderNumAtc span img {
    display: inline;
    vertical-align: top;
}
.tPad03 {
    padding-top: 3px;
}
.fn {
    font-weight: normal;
    font-weight: normal !important;
    font-style: normal !important;
}

.btnGry2 {
    color: #fff;
    background: #aaa;
    border: 1px solid #aaa;
}
.btnS3 {
    font-size: 11px;
    line-height: 1.1;
    padding: 2px 8px;
}
.baseTable td.lt {
    padding-left: 10px;
    padding-right: 10px;
}
.btnRed {
    color: #fff;
    background: #d50c0c;
    border: 1px solid #d50c0c;
}
.btnDel {
    padding-left: 13px;
    background: url(http://fiximage.10x10.co.kr/web2013/common/btn_close_popup.gif) left 2px no-repeat;
}
.btnW70 {
    width: 68px;
    padding-left: 0;
    padding-right: 0;
}
.cnt{
  margin-bottom: 0;
}
.tMarj2{
  margin-top: 3rem;
}
  </style>