<template>
  <div class="container">
      <h1 style="padding: 15px; font-size: 27px; margin: 30px;">배송 조회</h1>
      <div>
          <h4 style="margin-bottom: 20px;">조건검색</h4>
          <table class="table table-bordered">
              <tr>
                  <th>주문번호</th>
                  <td colspan="3">
                      <input v-model="searched" class="form-control" type="text" aria-label="default input example">
                  </td>
              </tr>
              <tr>
                  <th>주문 기간</th>
                  <td>
                      <span><input class="form-control" v-model="getDate1" type="date" aria-label="default input example"></span>
                  </td>
                  <td>
                      <span><input class="form-control" v-model="getDate2" type="date" aria-label="default input example"></span>
                  </td>
                  <td>
                      <button class="btn btn-outline-dark" @click="getToday()">오늘</button>
                      <button class="btn btn-outline-dark" @click="getYesterday()">어제</button>
                      <button class="btn btn-outline-dark" @click="getWeekAgo()">일주일</button>
                      <button class="btn btn-outline-dark" @click="getOneMonthAgo()">1개월</button>
                      <button class="btn btn-outline-dark" @click="getThreeMonthAgo()">3개월</button>
                  </td>
                </tr>
                <tr>
                    <th>배송 상태</th>
                    <td colspan="4">
                        <ul class="nav">
                            <li class="nav-item">
                                <div class="form-check">
                                <input v-bind:value="checkStatus1" v-model="checkSt" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
                                <label class="form-check-label" for="flexRadioDefault1">
                                    전체&nbsp;&nbsp;&nbsp;
                                </label>
                                </div>
                            </li>
                            <li class="nav-item">
                                <div class="form-check">
                                <input v-bind:value="checkStatus2" v-model="checkSt" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                                <label class="form-check-label" for="flexRadioDefault2">
                                    배송 준비&nbsp;&nbsp;&nbsp;
                                </label>
                                </div>
                            </li>
                            <li class="nav-item">
                                <div class="form-check">
                                <input v-bind:value="checkStatus3" v-model="checkSt" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
                                <label class="form-check-label" for="flexRadioDefault3">
                                    배송 중&nbsp;&nbsp;&nbsp;
                                </label>
                                </div>
                            </li>
                            <li class="nav-item">
                                <div class="form-check">
                                <input v-bind:value="checkStatus4" v-model="checkSt" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4">
                                <label class="form-check-label" for="flexRadioDefault4">
                                    배송 완료&nbsp;&nbsp;&nbsp;
                                </label>
                                </div>
                            </li>
                        </ul>
                    </td>
                </tr>
          </table>
      </div>

      <div style="text-align: center; margin-bottom: 60px;">
          <button type="button" class="btn btn-secondary" style="float: right;" @click="this.getTableList()">검색</button>
          <button class="btn btn-secondary" style="float: right;" @click="this.dataReset()">초기화</button>
      </div>
      <div>
      <p>총 검색 수 : {{ this.allSize }} 개</p>
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
      <button type="button" class="btn btn-outline-secondary m-2" style="float: left;">주문서 출력</button>
      <Paging 
      :pagination="pagination"
      v-on:prevPage="prevPage"
      v-on:nextPage="nextPage"
      v-on:firstPage="firstPage"
      v-on:lastPaging="lastPaging"
      v-on:changeNowPage="changeNowPage"/>
      </div>
     
  </div>
</template>

<script>
import axios from 'axios'
import Paging from '@/components/PagingComponent.vue';  

  export default {
      components : {
          Paging
      },
      data () {
          return {
            deliveryList : [],
              searched : null,
              getDate1 : null,
              getDate2 : null,
              checkStatus1 : null,
              checkStatus2 : "1",
              checkStatus3 : "2",
              checkStatus4 : "3",
              checkStatus5 : "4",
              checkSt : null,

              // 리스트
              tableList : [],
              paging : [],
              pagination : {},
              allSize : 0,  // 모든 데이터 수
              pageSize : 5, // 한 페이지에서 보여줄 데이터 수
              navSize : 5,  // 페이지네이션이 보여줄 최대 페이지 수
              lastPage : 1,  // Math.ceil(allSize / pageSize) 마지막 페이지
              curPage : 1,  // 현재 페이지
              startPage : 1,  // 페이지네이션 시작번호
              endPage : 1,  // 페이지네이션 끝번호
          }
      },
    created() {
      this.getDeliveryList(); // 비동기작업
    },
      methods : 
      {
        async getDeliveryList() { // 동기작업
        let result = await axios.get('/api/order/delivery')
                                .catch(err => console.log(err));
        this.deliveryList = result.data;
      },
          getToday() {
              let today = new Date();
              this.getDate2 = this.changeDate(today);
              this.getDate1 = this.changeDate(today);
          },
          getYesterday() {
              let yesterday = new Date();
              this.getDate2 = this.changeDate(yesterday);
              yesterday.setDate(yesterday.getDate()-1);
              this.getDate1 = this.changeDate(yesterday);
          },
          getWeekAgo(){
              let weekAgo = new Date();
              this.getDate2 = this.changeDate(weekAgo);
              weekAgo.setDate(weekAgo.getDate()-7);
              this.getDate1 = this.changeDate(weekAgo);
          },
          getOneMonthAgo() {
              let oneMonthAgo = new Date();
              this.getDate2 = this.changeDate(oneMonthAgo);
              oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
              this.getDate1 = this.changeDate(oneMonthAgo);
          },
          getThreeMonthAgo() {
              let threeMonthAgo = new Date();
              this.getDate2 = this.changeDate(threeMonthAgo);
              threeMonthAgo.setMonth(threeMonthAgo.getMonth() - 3);
              this.getDate1 = this.changeDate(threeMonthAgo);
          },
          changeDate(value) {
          let year = value.getFullYear();
          let month = ('0'+(value.getMonth()+1)).slice(-2);
          let day = ('0'+ value.getDate()).slice(-2);
          
          return `${year}-${month}-${day}`;
          },

          dataReset(){
              this.checkSearch = "1",
              this.searched = null,
              this.getDate1 = null,
              this.checkDate = "1",
              this.getDate2 = null,
              this.checkSt = null
          },

          async getTableList(curPage) {
              curPage = this.judgePage(curPage);
              if (!curPage || curPage <= 0) 
              curPage = this.startPage;
              let gap = curPage%this.navSize === 0 ?  this.navSize - 1 : curPage%this.navSize - 1;
              this.startPage = this.judgePage(curPage - gap);
              this.endPage = this.startPage + this.navSize - 1;
              await this.getTableCount(curPage);

              this.curPage = curPage;
              let data = {
                  param : {
                      limit : (curPage - 1) * this.pageSize,
                      offset : this.pageSize,
                      checkSearch : this.checkSearch,
                      searched : this.searched,
                      getDate1 : this.getDate1,
                      checkDate : this.checkDate,
                      getDate2 : this.getDate2,
                      checkLv : this.checkLv
                  }
              }
        let result = await axios.get('/api/order/delivery')
                                .catch(err => console.log(err));
        this.deliveryList = result.data;
      },
          async getTableCount() {
              let result = await axios.get(`/api/order/deliveryCount`) 
                                      .catch(err => console.log(err));
              this.allSize = result.data[0].count;
              this.lastPage = Math.ceil(this.allSize / this.pageSize);
              this.pagination = {
                              lastPage : this.lastPage, 
                              startPage : this.startPage, 
                              endPage : this.endPage, 
                              curPage : this.curPage
                              }
          },
          judgePage(page) {
              if (!page || page <= 0) 
              page = 1
              else if (page > this.lastPage) 
              page = this.lastPage
              return page
          },

          // 페이징
          prevPage(){
              this.getTableList(--this.curPage);
          },

          nextPage(){
              this.getTableList(++this.curPage);
          },

          firstPage(){
              this.curPage = 1;
              this.getTableList(this.curPage);
          },

          lastPaging(){
              this.curPage = this.lastPage;
              this.getTableList(this.curPage);
              
          },
          
          changeNowPage(page){
              this.curPage = page
              this.getTableList(this.curPage);
          }
      }
    }
</script>