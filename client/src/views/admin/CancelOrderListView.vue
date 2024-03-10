<template>
    <div class="container">
        <h1 style="padding: 15px; font-size: 27px; margin: 30px;">주문 취소 목록</h1>
        <div>
            <h4 style="margin-bottom: 20px;">조건검색</h4>
            <table class="table table-bordered">
                <tr>
                    <th>검색어</th>
                    <td>
                        <select class="form-select" v-model="checkSearch" aria-label="Default select example">
                            <option value="1">주문번호</option>
                            <option value="2">주문자명</option>
                        </select>
                    </td>
                    <td colspan="3">
                        <input v-model="searched" class="form-control" type="text" aria-label="default input example">
                    </td>
                </tr>
                <tr>
                    <th>기간검색</th>
                    <td>
                        <select class="form-select" v-model="checkDate" aria-label="Default select example">
                            <option value="1">주문일</option>
                            <option value="2">취소일</option>
                        </select>
                    </td>
                    <td>
                        <span><input class="form-control" type="date" v-model="getDate1" aria-label="default input example"></span>
                    </td>
                    <td>
                        <span><input class="form-control" type="date" v-model="getDate2" aria-label="default input example"></span>
                    </td>
                    <td>
                        <button class="btn btn-outline-dark" @click="getToday()">오늘</button>
                        <button class="btn btn-outline-dark" @click="getYesterday()">어제</button>
                        <button class="btn btn-outline-dark" @click="getWeekAgo()">일주일</button>
                        <button class="btn btn-outline-dark" @click="getOneMonthAgo()">1개월</button>
                        <button class="btn btn-outline-dark" @click="getThreeMonthAgo()">3개월</button>
                    </td>
                </tr>
            </table>
        </div>
        <div style="text-align: center; margin-bottom: 60px;">
            <button class="btn btn-dark" @click="this.getTableList()">검색</button>
            <button class="btn btn-secondary" @click="this.dataReset()">초기화</button>
        </div>
        <div>
        <p>검색된 취소 수 : {{ this.allSize }} 건 | 총 취소 금액: {{ this.totalPayment }} 원</p>
        <table class="table table-hover" style="font-size: 15px;">
            <thead>
            <tr class="table-primary">
                <th>주문번호</th>
                <th>주문일</th>
                <th>취소일</th>
                <th>주문자</th>
                <th>결제금액</th>
            </tr>
            </thead>
            <tbody>
            <!--for 과 if를 같이 사용은 불가능하다고 생각해라-->
            <tr v-for="(table, idx) in tableList" :key="idx">
                <td>{{ table.ord_no }}</td>
                <td>{{ this.dateFomat(table.ord_dt) }}</td>
                <td>{{ this.dateFomat(table.cancle_dt) }}</td>
                <td>{{ table.name }}</td>
                <td>{{ table.total_payment }}</td>
            </tr>
            </tbody>
        </table>
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
                checkSearch : "1",
                searched : null,
                checkDate : "1",
                getDate1 : null,
                getDate2 : null,
                totalPayment : 0,

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
        methods : {
            dateFomat(date){
                let date1 = new Date(date);
                const year = date1.getFullYear();
                const month = ('0' + (date1.getMonth() + 1)).slice(-2);
                const day = ('0' + date1.getDate()).slice(-2);
                const dateStr = `${year}-${month}-${day}`;
                return dateStr;
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
                this.getDate2 = null
            },

            async getTableList(curPage) {
                curPage = this.judgePage(curPage);
                if (!curPage || curPage <= 0) 
                curPage = this.startPage;
                let gap = curPage%this.navSize === 0 ?  this.navSize - 1 : curPage%this.navSize - 1;
                this.startPage = this.judgePage(curPage - gap);
                this.endPage = this.startPage + this.navSize - 1;
                await this.getTableCount(curPage);
                await this.getTableSum();
                this.curPage = curPage;
                let data = {
                    param : {
                        limit : this.pageSize,
                        offset : (curPage - 1) * this.pageSize,
                        checkSearch : this.checkSearch,
                        searched : this.searched,
                        getDate1 : this.getDate1,
                        checkDate : this.checkDate,
                        getDate2 : this.getDate2,
                    }
                }
                let result = await axios.post("/api/order/adCancleOrderList", data)
                                        .catch(err => console.log(err));
                console.log(result);
                this.tableList = result.data;
            },
            // 테이블 행 총 갯수 가져오기
            async getTableCount() {
                let data = {
                    param : {
                        checkSearch : this.checkSearch,
                        searched : this.searched,
                        getDate1 : this.getDate1,
                        checkDate : this.checkDate,
                        getDate2 : this.getDate2,
                    }
                }
                let result = await axios.post(`/api/order/adCancleOrderCount`, data) 
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
            // 테이블 총 주문액 가져오기
            async getTableSum() {
                let data = {
                    param : {
                        checkSearch : this.checkSearch,
                        searched : this.searched,
                        getDate1 : this.getDate1,
                        checkDate : this.checkDate,
                        getDate2 : this.getDate2,
                    }
                }
                let result = await axios.post(`/api/order/adCancleOrderTotalPayment`, data) 
                                        .catch(err => console.log(err));
                this.totalPayment = result.data[0].SUM;
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