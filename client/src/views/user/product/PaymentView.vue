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
        <!--주문고객정보,배송지정보 컴포넌트-->
        <OrderCustomerInfo v-bind:list="paymentList"/>
        
        
  </template>

<script>
import OrderCustomerInfo from '@/components/OrderCustomerInfo.vue';
import TotalOrderPrice from '@/components/totalOrderPrice.vue';
import axios from 'axios';

export default {
  data() {
      return {
          paymentList: []
      };
  },
  created() {
    //받아온 수량으로 설정
      this.getCartList();
  },
  computed: {
      
  },
  methods: {
      //주문 목록(수정 필요)
      async getCartList() {
          let result = await axios.get('/apiproduct/cart/1')
              .catch(err => console.log(err));
          console.log(result);
          let list = result.data;
          this.paymentList = list;
      },
    },
  components: { TotalOrderPrice, OrderCustomerInfo }
}
</script>
  
<style>
</style>