<template>
    <div class="container">
      <h1 style="padding: 15px; font-size: 27px;">배송관리</h1>
      <p>주문번호<input type="text" id="inputDelNo"></p>
      <p>주문 기간<input type="date">-<input type="date"></p>
      <button type="button" class="btn btn-secondary m-2" style="float: right;">검색</button>
      <button type="button" class="btn btn-secondary m-2" style="float: right;">초기화</button>
    </div>
    <div class="container">
      <button type="button" class="btn btn-outline-secondary m-2">수정</button>
      <button type="button" class="btn btn-outline-secondary m-2">배송완료</button>
      <table class="table table-hover" style="font-size: 15px;">
        <thead>
          <tr class="table-primary">
            <th><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></th>
            <th>주문번호</th>
            <th>주문일자</th>
            <th>배송정보</th>
            <th>운송장번호</th>
            <th>배송상태</th>
            <th>총주문액</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(delivery, idx) in deliveryList" :key="idx">
            <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></td>
            <td>{{ delivery.deli_no }}</td>
            <td>{{ delivery.ord_dt }}</td>
            <td>{{ delivery.fulladdr }}</td>
            <td>{{ delivery.ship_no }}</td>
            <td>{{ delivery.status }}</td>
            <td>{{ delivery.total_price }}</td>
          </tr>
        </tbody>
      </table>
      <button type="button" class="btn btn-outline-secondary m-2" style="float: right;">주문서 출력</button>
    </div>
  </template>
  
  <script>
 import axios from 'axios'
    export default {
    data () {
      return {
        deliveryList : []
      }
    },
    created() {
      this.getDeliveryList(); // 비동기작업
    },
    methods : {
      async getDeliveryList() { // 동기작업
        let result = await axios.get('/api/order/delivery')
                                .catch(err => console.log(err));
        this.deliveryList = result.data;
      }
    }
  }
  </script>