<template>
    <div class="container">
      <h1 style="padding: 15px; font-size: 27px;">쿠폰 지급 목록</h1>
      <button type="button" class="btn btn-outline-secondary m-2"  @click="modalOpenTF" v-if="modalOpen === false">지급</button>
      <button type="button" class="btn btn-outline-secondary m-2"  @click="modalOpenTF" v-if="modalOpen === true">닫기</button>
      <div class="table-responsive">
      <table class="table table-hover align-middle" style="font-size: 15px; text-align: center; table-layout: fixed;">
        <thead>
          <tr class="table-primary">
            <th class="col-1">No.</th>
            <th class="col-1">회원번호</th>
            <th class="col-2">쿠폰명</th>
            <th class="col-2">지급일</th>
            <th class="col-2">종료일</th>
            <th class="col-2">사용일</th>
            <th class="col-1">상태</th>
          </tr>
        </thead>
        <tbody>
          <!--for 과 if를 같이 사용은 불가능하다고 생각해라-->
          <tr v-for="(table, idx) in tableList" :key="idx">
            <td class="col-1">{{ table.poss_no }}</td>
            <td class="col-1">{{ table.mem_no }}</td>
            <td class="col-2">{{ table.cpn_name }}</td>
            <td class="col-2">{{ this.dateFomat(table.crt_dt) }}</td>
            <td class="col-2">{{ this.dateFomat(table.end_dt) }}</td>
            <td class="col-2">{{ this.dateFomat(table.cpnused_dt) }}</td>
            <td class="col-1">{{ this.changeSt(table.status) }}</td>
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
          <h4 class="mb-4">쿠폰 지급</h4>
              <div class="row">
                <table class="table">
                    <tr>
                        <td class="col-1"></td>
                        <th class="col-1">쿠폰명</th>
                        <td class="col-4">                  
                            <select class="form-select" v-model="possCouponInfo.cpn_no" aria-label="Default select example">
                                <option value="1">WHITE 할인쿠폰</option>
                                <option value="2">BASIC 할인쿠폰</option>
                                <option value="3">VIP 할인쿠폰</option>
                                <option value="4">GOLD 할인쿠폰</option>
                            </select>
                        </td>
                        <td class="col-3"></td>
                    </tr>
                </table>
                <table class="table">
                    <tr>
                        <td class="col-1"></td>
                        <th class="col-1">등급</th>
                        <td class="col-4">                  
                            <select class="form-select" v-model="possCouponInfo.grd_no" aria-label="Default select example">
                                <option value="1">WHITE</option>
                                <option value="2">BASIC</option>
                                <option value="3">VIP</option>
                                <option value="4">GOLD</option>
                            </select>
                        </td>
                        <td class="col-3"></td>
                    </tr>
                </table>
                <table class="table">
                    <tr>
                        <td class="col-1"></td>
                        <th class="col-1">만료일</th>
                        <td class="col-4">
                            <span><input class="form-control" v-model="possCouponInfo.end_dt" type="date" aria-label="default input example"></span>
                        </td>
                        <td class="col-3">
                            <button class="btn btn-outline-dark" @click="getToday()">오늘</button>
                            <button class="btn btn-outline-dark" @click="getTomorrow()">내일</button>
                            <button class="btn btn-outline-dark" @click="getWeekLater()">일주일</button>
                            <button class="btn btn-outline-dark" @click="getOneMonthLater()">1개월</button>
                            <button class="btn btn-outline-dark" @click="getThreeMonthLater()">3개월</button>
                        </td>
                    </tr>
                </table>
              </div>
            <div class="d-grid gap-2 col-3 mx-auto">
              <button type="button" class="btn btn-primary" @click="possCouponInsert()">지급하기</button>
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
        possCouponInfo: {
          cpn_no: '1',
          grd_no: '1',
          end_dt: null,
        },

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
        changeSt(st) {
            if (st == 0) {
                st = "대기"
            } else if (st == 1) {
                st = "사용중"
            } else if (st == 2) {
                st = "폐기(만료)"
            }
            return st;
        },
        getToday() {
                let today = new Date();
                this.possCouponInfo.end_dt = this.changeDate(today);
            },
        getTomorrow() {
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            this.possCouponInfo.end_dt = this.changeDate(tomorrow);
        },
        getWeekLater(){
            let weekLater = new Date();
            weekLater.setDate(weekLater.getDate() + 7);
            this.possCouponInfo.end_dt = this.changeDate(weekLater);
        },
        getOneMonthLater() {
            let oneMonthLater = new Date();
            oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
            this.possCouponInfo.end_dt = this.changeDate(oneMonthLater);
        },
        getThreeMonthLater() {
            let threeMonthLater = new Date();
            threeMonthLater.setMonth(threeMonthLater.getMonth() + 3);
            this.possCouponInfo.end_dt = this.changeDate(threeMonthLater);
        },
        changeDate(value) {
            let year = value.getFullYear();
            let month = ('0'+(value.getMonth()+1)).slice(-2);
            let day = ('0'+ value.getDate()).slice(-2);
            
            return `${year}-${month}-${day}`;
        },
      dateFomat(date){
        if(date != null){
            let date1 = new Date(date);
            const year = date1.getFullYear();
            const month = ('0' + (date1.getMonth() + 1)).slice(-2);
            const day = ('0' + date1.getDate()).slice(-2);
            const dateStr = `${year}-${month}-${day}`;
            return dateStr;
        }
      },
      async possCouponInsert(){
        let data = {
            param: {
                cpn_no: this.possCouponInfo.cpn_no,
                grd_no: this.possCouponInfo.grd_no,
                end_dt: this.possCouponInfo.end_dt,
                status : 0
            }
        };
        let result = await axios.post("/api/user/possCouponInsert", data)
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
        let result = await axios.get(`/api/user/giveCouponList/${(curPage - 1) * this.pageSize}/${this.pageSize}`)
                                .catch(err => console.log(err));
        this.tableList = result.data;
      },
      // 테이블 행 총 갯수 가져오기  /api/~~ 만 수정해서 사용.
      async getTableCount() {
        let result = await axios.get(`/api/user/giveCoupon`) 
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
