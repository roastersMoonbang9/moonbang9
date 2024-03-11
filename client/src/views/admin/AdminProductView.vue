<template>
    <div class="container">
        <h1 style="padding: 15px; font-size: 27px; margin: 30px;">상품 목록</h1>
        <div>
            <h4 style="margin-bottom: 20px;">조건검색</h4>
            <table class="table table-bordered">
                <tr>
                    <th>검색어</th>
                    <td>
                        <select class="form-select" v-model="checkSearch" aria-label="Default select example">
                            <option value="1">상품명</option>
                            <option value="2">브랜드</option>
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
                            <option value="1">등록일</option>
                            <option value="2">수정일</option>
                        </select>
                    </td>
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
                    <th>카테고리</th>
                    <td colspan="4">
                        <ul class="nav">
                            <li class="nav-item">
                                <div class="form-check">
                                <input v-bind:value="checkLarge1" v-model="large_code" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
                                <label class="form-check-label" for="flexRadioDefault1">
                                    전체&nbsp;&nbsp;&nbsp;
                                </label>
                                </div>
                            </li>
                            <li class="nav-item">
                                <div class="form-check">
                                <input v-bind:value="checkLarge2" v-model="large_code" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                                <label class="form-check-label" for="flexRadioDefault2">
                                    다이어리&nbsp;&nbsp;&nbsp;
                                </label>
                                </div>
                            </li>
                            <li class="nav-item">
                                <div class="form-check">
                                <input v-bind:value="checkLarge3" v-model="large_code" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
                                <label class="form-check-label" for="flexRadioDefault3">
                                    노트&nbsp;&nbsp;&nbsp;
                                </label>
                                </div>
                            </li>
                            <li class="nav-item">
                                <div class="form-check">
                                <input v-bind:value="checkLarge4" v-model="large_code" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4">
                                <label class="form-check-label" for="flexRadioDefault4">
                                    필기류&nbsp;&nbsp;&nbsp;
                                </label>
                                </div>
                            </li>
                            <li class="nav-item">
                                <div class="form-check">
                                <input v-bind:value="checkLarge5" v-model="large_code" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5">
                                <label class="form-check-label" for="flexRadioDefault5">
                                    사무용품
                                </label>
                                </div>
                            </li>
                            <li class="nav-item">
                                <div class="form-check">
                                <input v-bind:value="checkLarge6" v-model="large_code" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5">
                                <label class="form-check-label" for="flexRadioDefault5">
                                    데코레이션
                                </label>
                                </div>
                            </li>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>

        <div style="text-align: center; margin-bottom: 60px;">
            <button class="btn btn-dark" @click="this.getTableList()">검색</button>
            <button class="btn btn-secondary" @click="this.dataReset()">초기화</button>
        </div>


        <div>
        <p>검색된 상품 수 : {{ this.allSize }} 개</p>
        <table class="table table-hover" style="font-size: 15px;">
            <thead>
            <tr class="table-primary">
                <th>상품코드</th>
                <th>상품명</th>
                <th>브랜드</th>
                <th>대분류</th>
                <th>소분류</th>
                <th>판매가</th>
                <th>할인가</th>
                <th>할인율</th>
                <th>등록일</th>
                <th>수정일</th>
            </tr>
            </thead>
            <tbody>
            <!--for 과 if를 같이 사용은 불가능하다고 생각해라-->
            <tr v-for="(table, idx) in tableList" :key="idx">
                <td>{{ table.prdt_cd }}</td>
                <td>{{ table.prdt_name }}</td>
                <td>{{ table.brand }}</td>
                <td>{{ this.changeCategory(table.large_code) }}</td>
                <td>{{ table.small_code }}</td>
                <td>{{ table.price }}</td>
                <td>{{ table.sale_price }}</td>
                <td>{{ table.dc_pct }}</td>
                <td>{{ this.dateFomat(table.regis_dt) }}</td>
                <td>{{ this.dateFomat(table.modify_dt) }}</td>
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
            getDate1 : null,
            checkDate : "1",
            getDate2 : null,
            
            checkLarge1 : null,
            checkLarge2 : "A",
            checkLarge3 : "B",
            checkLarge4 : "C",
            checkLarge5 : "D",
            checkLarge6 : "E",
            large_code : null,

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
        changeCategory(cate) {
            if (cate == "A") {
                cate = "다이어리"
            } else if (cate == "B") {
                cate = "노트"
            } else if (cate == "C") {
                cate = "필기류"
            } else if (cate == "D") {
                cate = "사무용품"
            } else if (cate == "E") {
                cate = "데코레이션"
            }
            return cate;
        }, //카테고리 컴포넌트 만들어서 소분류 보여줄지 말지 생각중
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
            this.large_code = null
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
                    checkSearch : this.checkSearch,
                    searched : this.searched,
                    getDate1 : this.getDate1,
                    checkDate : this.checkDate,
                    getDate2 : this.getDate2,
                    large_code : this.large_code
                }
            }
            let result = await axios.post("/api/product", data)
                                    .catch(err => console.log(err));
            console.log(result);
            this.tableList = result.data;
        },
        // 테이블 행 총 갯수 가져오기  /api/~~ 만 수정해서 사용.
        async getTableCount() { //여기서 에러같음 ㅠㅠ 수정 예정
            let data = {
                param : {
                    checkSearch : this.checkSearch,
                    searched : this.searched,
                    getDate1 : this.getDate1,
                    checkDate : this.checkDate,
                    getDate2 : this.getDate2,
                    large_code : this.large_code
                }
            }
            let result = await axios.post(`/api/product/productCount`, data) 
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
