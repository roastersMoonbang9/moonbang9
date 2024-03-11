<template>
    <div class="container">
      <h1 style="padding: 15px; font-size: 27px;">쿠폰 관리</h1>
      <button type="button" class="btn btn-outline-secondary m-2"  @click="modalOpenTF" v-if="modalOpen === false">등록</button>
      <button type="button" class="btn btn-outline-secondary m-2"  @click="modalOpenTF" v-if="modalOpen === true">닫기</button>
      <div class="table-responsive">
      <table class="table table-hover align-middle" style="font-size: 15px; text-align: center; table-layout: fixed;">
        <thead>
          <tr class="table-primary">
            <th class="col-1">No.</th>
            <th class="col-3">쿠폰명</th>
            <th class="col-2">할인율</th>
            <th class="col-2">할인금액</th>
            <th class="col-2">등록일</th>
            <th class="col-1"></th>
          </tr>
        </thead>
        <tbody>
          <!--for 과 if를 같이 사용은 불가능하다고 생각해라-->
          <tr v-for="(table, idx) in tableList" :key="idx">
            <td class="col-1">{{ table.cpn_no }}</td>
            <td class="col-3">{{ table.cpn_name }}</td>
            <td class="col-2">{{ table.dc_pct }}</td>
            <td class="col-2">{{ table.dc_price }}</td>
            <td class="col-2">{{ this.dateFomat(table.cpn_dt) }}</td>
            <td class="col-1"><button class="btn" @click="delCoupon(table.cpn_no)">삭제</button></td>
          </tr>
        </tbody>
      </table>
    </div>
      <Paging 
      :pagination="pagination"
      v-on:prevPage="prevPage"
      v-on:nextPage="nextPage"
      v-on:firstPage="firstPage"
      v-on:lastPaging="lastPaging"
      v-on:changeNowPage="changeNowPage"/>

      <div class="black-bg" v-if="modalOpen === true">
        <div class="bg-light rounded h-100 p-4">                
          <h4 class="mb-4">쿠폰 등록</h4>
              <div class="row mb-3">
                  <label for="couponName" class="col-sm-2 col-form-label" >쿠폰명</label>
                  <div class="col-sm-10">
                      <input type="text" class="form-control" name="couponName" v-model="couponInfo.cpn_name">
                  </div>
              </div>
              <fieldset class="row mb-3">
                  <legend for="noticeImpor" class="col-form-label col-sm-2 pt-0">할인 방식</legend>
                  <div class="col-sm-10">
                    <ul class="nav">
                      <li class="nav-item">
                      <div class="form-check">
                          <input for="bannSt" class="form-check-input" type="radio" name="gridRadios1" id="gridRadios1" :value="checkDc0" v-model="checkDc" checked>
                          <label class="form-check-label" for="gridRadios1">
                              할인율&nbsp;&nbsp;&nbsp;
                          </label>
                      </div>
                      </li>
                      <li class="nav-item">
                      <div class="form-check">
                          <input for="bannSt" class="form-check-input" type="radio" name="gridRadios2" id="gridRadios2" :value="checkDc1" v-model="checkDc">
                          <label class="form-check-label" for="gridRadios2">
                              할인금액
                          </label>
                      </div>
                    </li>
                    </ul>
                  </div>
              </fieldset>
              <div v-if="this.checkDc == 0" class="row mb-3">
                  <label for="couponPct" class="col-sm-2 col-form-label">할인율</label>
                  <div class="col-sm-10">
                      <input @change="this.changePct(this.couponInfo.dc_pct)" type="number" class="form-control" name="couponPct" v-model="couponInfo.dc_pct">
                  </div>
              </div>
              <div v-else-if="this.checkDc == 1" class="row mb-3">
                  <label for="couponPrice" class="col-sm-2 col-form-label">할인금액</label>
                  <div class="col-sm-10">
                      <input @change="this.changePrice(this.couponInfo.dc_price)" type="number" class="form-control" name="couponPrice" v-model="couponInfo.dc_price">
                  </div>
              </div>
              <div class="mb-3">
              </div>
            <div class="d-grid gap-2 col-3 mx-auto">
              <button type="button" class="btn btn-primary" @click="couponInsert()">등록하기</button>
            </div>
        </div>
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
        modalOpen: false,
        couponInfo: {
          cpn_name: '',
          dc_pct: null,
          dc_price: null,
        },
        checkDc : '',
        checkDc0 : "0",
        checkDc1 : "1",


        tableList : [],
        
        paging : [],
        pagination : {},
        allSize : 1,  // 모든 데이터 수
        pageSize : 5, // 한 페이지에서 보여줄 데이터 수
        navSize : 5,  // 페이지네이션이 보여줄 최대 페이지 수
        lastPage : 1,  // Math.ceil(allSize / pageSize) 마지막 페이지
        curPage : 1,  // 현재 페이지
        startPage : 1,  // 페이지네이션 시작번호
        endPage : 1,  // 페이지네이션 끝번호
      }
    },
    created() {
      this.getTableCount();
    },
    mounted() {
      this.getTableList();    
    },
    methods : {
      dateFomat(date){
        let date1 = new Date(date);
        const year = date1.getFullYear();
        const month = ('0' + (date1.getMonth() + 1)).slice(-2);
        const day = ('0' + date1.getDate()).slice(-2);
        const dateStr = `${year}-${month}-${day}`;
        return dateStr;
      },
      changePct(pct) {
            if (pct < 0 || pct == '') {
                this.couponInfo.dc_pct = 0;
            } else if (pct > 50) {
                alert('할인율은 최대 50%입니다.');
                this.couponInfo.dc_pct = 50;
            }
        },
        changePrice(price) {
            if (price < 0 || price == '') {
                this.couponInfo.dc_price = 0;
            } else if (price > 30000) {
                alert('할인금액은 최대 30000원 입니다.');
                this.couponInfo.dc_price = 30000;
            }
        },
      async delCoupon(no) {
        console.log(no);
        if(confirm('정말 삭제하시겠습니까?')){
          let result = await axios.delete(`/api/user/couponDelete/${no}`)
                                  .catch(err => console.log(err));
          console.log(result.data);
          this.$router.go(this.$router.currentRoute);
        }
        
      },
      async couponInsert(){
        let data = {
            param: {
                cpn_name: this.couponInfo.cpn_name,
                dc_pct: this.couponInfo.dc_pct,
                dc_price: this.couponInfo.dc_price,
            }
        };
        let result = await axios.post("/api/user/couponInsert", data)
                               .catch(err => console.log(err));
        console.log(' Result출력:', result.data);
        this.$router.go(this.$router.currentRoute);
      },
      modalOpenTF(){
        if(this.modalOpen == false){
          this.modalOpen = true;
        }else{
          this.modalOpen = false;
        }
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
        console.log((curPage-1) * this.pageSize, this.pageSize);
        let result = await axios.get(`/api/user/couponList/${(curPage - 1) * this.pageSize}/${this.pageSize}`)
                                .catch(err => console.log(err));
        this.tableList = result.data;
      },
      // 테이블 행 총 갯수 가져오기  /api/~~ 만 수정해서 사용.
      async getTableCount() {
        let result = await axios.get(`/api/user/coupon`) 
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
