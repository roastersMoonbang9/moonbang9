<template>
    <div class="myContent" style="float: none;">
            <div class="titleSection">
                <h3>보유 쿠폰내역</h3>
            </div>
            
            <div class="mySection">
                <fieldset>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">쿠폰명</th>
                                <th scope="col">할인율</th>
                                <th scope="col">할인금액</th>
                                <th scope="col">지급일</th>
                                <th scope="col">만료일</th>
                                <th scope="col">사용일</th>
                                <th scope="col">상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(table, idx) in tableList" :key="idx" @click="goToOrderDetail(table.ord_no)">
                                <td>{{ table.cpn_name }}</td>
                                <td>{{ table.dc_pct }} %</td>
                                <td>{{ table.dc_price }}</td>
                                <td>{{ getDate(table.crt_dt) }}</td>
                                <td>{{ getDate(table.end_dt) }}</td>
                                <td>{{ getDate(table.cpnused_dt) }}</td>
                                <td>{{ this.checkStatus(table.status) }}</td>
                            </tr>
                            <tr v-if="tableList.length == 0">
                                <td colspan="6">보유중인 쿠폰이 없습니다.</td>
                            </tr>
                        </tbody>
                    </table>
                <div class="pageWrapV15 tMar20">
                    <div class="paging">
    <!-- 페이지 컴포넌트 자리-->
    <Paging :pagination="pagination" v-on:prevPage="prevPage" v-on:nextPage="nextPage"
    v-on:firstPage="firstPage" v-on:lastPaging="lastPaging" v-on:changeNowPage="changeNowPage"/>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    </template>
    <script>
    import axios from 'axios'
    import Paging from '@/components/PagingComponent.vue';
    
    export default{ 
        components : {
                Paging
        },
        data(){
            return{
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
            };
        },
        created(){
            this.getTableList();
        },
        methods:{
            checkStatus(st) {
                    if (st == 0) {
                        st = "사용가능"
                    } else if (st == 1) {
                        st = "사용중"
                    } else if (st == 2) {
                        st = "기간만료"
                    } 
                    return st;
                },
                changeDate(value) {
                let year = value.getFullYear();
                let month = ('0'+(value.getMonth()+1)).slice(-2);
                let day = ('0'+ value.getDate()).slice(-2);
                
                return `${year}-${month}-${day}`;
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
                            limit : this.pageSize,
                            offset : (curPage - 1) * this.pageSize,
                            chMem : this.$store.state.userStore.mem_no
                        }
                    }
                    let result = await axios.post("/api/user/possCouponList", data)
                                            .catch(err => console.log(err));
                    this.tableList = result.data;
                    console.log(this.tableList);
                },
                // 테이블 행 총 갯수 가져오기
                async getTableCount() {
                    
                            let chMem = this.$store.state.userStore.mem_no
                   
                    let result = await axios.get(`/api/user/possCouponCount/`+ chMem) 
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
                },
                 //날짜 양식변경
                getDate(days) {
                    if(days == null){
                        return '';
                    }else{
                        let res = null;
                        let date = new Date(days);
                        let y = date.getFullYear();
                        let m = ("0" + (date.getMonth() + 1)).slice(-2);
                        let d = ("0" + date.getDate()).slice(-2);
        
                        res = `${y}년${m}월${d}일`;
                        return res;
                    }
                }
        }
    }
    </script>
