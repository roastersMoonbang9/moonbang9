<template>
    <div>
        <h1>장바구니</h1>
    </div>
    <section class="py-5">
          <h2 class="h5 text-uppercase mb-4"><span class="bg-light" style="float: left;padding: 0 10px;">장바구니 목록</span></h2>
          <div class="row" style="display: block;">
            <div class="mb-4 mb-lg-0" style="margin: 0 auto;">
              <!-- CART TABLE-->
              <div class="table-responsive mb-4">
                <table class="table text-nowrap">
                  <thead class="bg-light">
                    <tr>
                      <th class="border-0 p-3" scope="col"><input type="checkbox" name="cart_checkbox" v-model="selectAll"></th>
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
                    <tr v-for="(list, idx) in cartList" v-bind:key="idx">
                      <th class="border-0 p-3" scope="col"><input type="checkbox" v-model="selected" :key="idx" :value="list"></th>
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
                        <div class="border align-items-center justify-content-between px-0">
                          <div class="quantity">
                            <button class="dec-btn p-0 glyphicon glyphicon-chevron-left" @click="minusQty($event,idx)"></button>
                            <input class="form-control form-control-sm border-0 shadow-0 p-0" min="1" type="number" :value="list.cart_qty" :key="idx" @input="cartQty($event,idx)" style="-moz-appearance: textfield;"/>
                            <button class="dec-btn p-0 glyphicon glyphicon-chevron-right" @click="addQty(idx)"></button>
                          </div>
                        </div>
                        <input class="form-control form-control-sm border-0 shadow-0 p-0" type="button" value="수정" @click="modCartQty(list)"/>
                      </td>
                      <td class="p-3 align-middle border-light">
                        <p class="mb-0 small">{{list.total_price}}</p>
                      </td>
                      <td class="p-3 align-middle border-light"><a class="reset-anchor" href="#!"><i class="fas fa-trash-alt small text-muted"></i></a></td>
                      <td class="p-3 align-middle border-light"></td>
                      <td class="p-3 align-middle border-light">
                        <div class="d-flex flex-column d-grid gap-4 align-items-center">
                          <input type="button" value="바로주문">
                          <input type="button" value="삭제" @click="delCartInfo(list,idx)">
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot style="border : none; border-style : none;">
                    <tr style="border-style : none;">
                      <td style="border-style : none;"><input type="button" value="선택삭제" @click="delCartList()"></td>
                    </tr>
                    <tr>
                      <!--페이징 컴포넌트 자리-->
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </section>
        <!--주문금액 컴포넌트-->
        <TotalOrderPrice v-bind:list="cartList"/>
        <div>
          <button>계속 쇼핑하기</button>
          <button>선택상품 주문하기</button>
          <button>전체상품 주문하기</button>
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
                return this.cartList ? (this.selected ? (this.selected.length === this.cartList.length) : false) : false;
            },
            set(value) {
                const selected = [];
                if (value && this.cartList != []) {
                    this.cartList.forEach((list) => {
                        selected.push(list);
                    });
                }
                this.selected = selected;
            },
        },
    },
    methods: {
        //장바구니 목록
        async getCartList() {
            let result = await axios.get('/apiproduct/cart/1')
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
        }
    },
    components: { TotalOrderPrice }
}
  </script>
    
  <style>
  </style>