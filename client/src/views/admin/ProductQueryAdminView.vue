<template>
    <div class="container">
        <h1 style="padding: 15px; font-size: 27px; margin: 30px;">상품 문의 관리</h1>
        <div>
            <h4 style="margin-bottom: 20px;">조건검색</h4>
            <table class="table table-bordered">
                <tr>
                    <th>문의 기간</th>
                    <td>
                        <span><input class="form-control" v-model="getDate1" type="date"
                                aria-label="default input example"></span>
                    </td>
                    <td>
                        <span><input class="form-control" v-model="getDate2" type="date"
                                aria-label="default input example"></span>
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
                    <th>답변 상태</th>
                    <td colspan="4">
                        <ul class="nav">
                            <li class="nav-item">
                                <div class="form-check">
                                    <input v-bind:value="checkStatus1" v-model="checkSt" class="form-check-input"
                                        type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        전체&nbsp;&nbsp;&nbsp;
                                    </label>
                                </div>
                            </li>
                            <li class="nav-item">
                                <div class="form-check">
                                    <input v-bind:value="checkStatus2" v-model="checkSt" class="form-check-input"
                                        type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        답변 없음&nbsp;&nbsp;&nbsp;
                                    </label>
                                </div>
                            </li>
                            <li class="nav-item">
                                <div class="form-check">
                                    <input v-bind:value="checkStatus3" v-model="checkSt" class="form-check-input"
                                        type="radio" name="flexRadioDefault" id="flexRadioDefault3">
                                    <label class="form-check-label" for="flexRadioDefault3">
                                        답변 완료&nbsp;&nbsp;&nbsp;
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>
        <div style="text-align: center; margin-bottom: 60px;">
            <button class="btn btn-secondary" style="float: right;" @click="this.dataReset()">초기화</button>
            <button type="button" class="btn btn-dark" style="float: right;" @click="this.getTableList()">검색</button>
        </div>
        <div>
            <p>총 검색 수 : {{ this.allSize }} 개</p>
            <table class="table table-hover" style="font-size: 15px;">
                <thead>
                    <tr class="table-primary">
                        <th>번호</th>
                        <th>상품번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일자</th>
                        <th>답변상태</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(table, idx) in tableList" :key="idx " @click="openQueryForm(table.qst_no)">
                        <td>{{ idx + 1 }}</td>
                        <td>{{ table.prdt_cd }}</td>
                        <td>{{ table.title }}</td>
                        <td>{{ table.id }}</td>
                        <td>{{ dateFomat(table.qst_dt)}}</td>
                        <td>{{ this.changeStatus(parseInt(table.status)) }}</td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-bordered table-primary" v-if="modalOpen === true">

                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td>{{selected.title}}</td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>{{selected.id}}</td>
                        </tr>

                            
                        <tr>
                            <th>작성일자</th>
                            <td>{{dateFomat(selected.qst_dt)}}</td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>{{selected.content}}
                            </td>
                        </tr>

                        <tr v-if="selected.status == 0">
                            <th>답변</th>
                            <td><input class="form-control" type="text" v-model="answer"><button class="btn btn-info" @click="submitQueryAnsw">등록</button></td>
                        </tr>
                        <tr v-else-if="selected.status == 1">
                            <th>답변</th>
                            <td>{{ selected.answer }}</td>
                        </tr>
                    </tbody>
                </table>
            <!-- 1) 페이징 테그 복붙 -->
            <Paging :pagination="pagination" v-on:prevPage="prevPage" v-on:nextPage="nextPage"
                v-on:firstPage="firstPage" v-on:lastPaging="lastPaging" v-on:changeNowPage="changeNowPage" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// 2) 임포트 해주기 
import Paging from '@/components/PagingComponent.vue';

export default {
    components: {
        Paging
    },
    data() {
        return {

            getDate1: null,
            getDate2: null,
            checkStatus1: null, //전체
            checkStatus2: "0", //답변없음
            checkStatus3: "1", //답변 완료
            checkSt: null,
        //    queryForm: false,
            qst_no:'',
            answer:'',
            modalOpen:false,
            selected: {},

            // 리스트
            tableList: [],
            //3) 페이징 [] 가져오기
            paging: [],
            pagination: {},
            allSize: 0,  // 모든 데이터 수
            pageSize: 5, // 한 페이지에서 보여줄 데이터 수
            navSize: 5,  // 페이지네이션이 보여줄 최대 페이지 수
            lastPage: 1,  // Math.ceil(allSize / pageSize) 마지막 페이지
            curPage: 1,  // 현재 페이지
            startPage: 1,  // 페이지네이션 시작번호
            endPage: 1,  // 페이지네이션 끝번호
        }
    },
    methods:
    {
        dateFomat(date){
        let date1 = new Date(date);
        const year = date1.getFullYear();
        const month = ('0' + (date1.getMonth() + 1)).slice(-2);
        const day = ('0' + date1.getDate()).slice(-2);
        const dateStr = `${year}-${month}-${day}`;
        return dateStr;
      },
        changeStatus(status) {
            if (status == 0) {
                status = "답변 없음"
            } else if (status == 1) {
                status = "답변 완료"
            } 
            return status;
        },

        getToday() {
            let today = new Date();
            this.getDate2 = this.changeDate(today);
            this.getDate1 = this.changeDate(today);
        },
        getYesterday() {
            let yesterday = new Date();
            this.getDate2 = this.changeDate(yesterday);
            yesterday.setDate(yesterday.getDate() - 1);
            this.getDate1 = this.changeDate(yesterday);
        },
        getWeekAgo() {
            let weekAgo = new Date();
            this.getDate2 = this.changeDate(weekAgo);
            weekAgo.setDate(weekAgo.getDate() - 7);
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
            let month = ('0' + (value.getMonth() + 1)).slice(-2);
            let day = ('0' + value.getDate()).slice(-2);

            return `${year}-${month}-${day}`;
        },


        dataReset() {
                this.getDate1 = null,
                this.checkDate = "1",
                this.getDate2 = null,
                this.checkSt = null
        },
        //4) 전체를 가져와서 
        async getTableList(curPage) {
            curPage = this.judgePage(curPage);
            if (!curPage || curPage <= 0)
                curPage = this.startPage;
            let gap = curPage % this.navSize === 0 ? this.navSize - 1 : curPage % this.navSize - 1;
            this.startPage = this.judgePage(curPage - gap);
            this.endPage = this.startPage + this.navSize - 1;
            await this.getTableCount(curPage);

            this.curPage = curPage;
            let data = {
                param: {
                    limit: this.pageSize,
                    offset: (curPage - 1) * this.pageSize,
                    getDate1: this.getDate1,
                    checkDate: this.checkDate,
                    getDate2: this.getDate2,
                    checkSt: this.checkSt
                }
            }
            let result = await axios.post('/api/product/queryListAll', data)
                .catch(err => console.log(err));
            console.log(result);
            this.tableList = result.data;
        },
        //5) AXIOS.GET ()수정할 주소를 가져와서 수정
        async getTableCount() {
            let data = {
                param: {
                    getDate1: this.getDate1,
                    checkDate: this.checkDate,
                    getDate2: this.getDate2,
                    checkSt: this.checkSt
                }
            }
            let result = await axios.post(`/api/product/queryCount`, data) //쿼리문에 count문이 있어야함
                .catch(err => console.log(err));
            this.allSize = result.data[0].count;
            this.lastPage = Math.ceil(this.allSize / this.pageSize);
            this.pagination = {
                lastPage: this.lastPage,
                startPage: this.startPage,
                endPage: this.endPage,
                curPage: this.curPage
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
        prevPage() {
            this.getTableList(--this.curPage);
        },

        nextPage() {
            this.getTableList(++this.curPage);
        },

        firstPage() {
            this.curPage = 1;
            this.getTableList(this.curPage);
        },

        lastPaging() {
            this.curPage = this.lastPage;
            this.getTableList(this.curPage);

        },

        changeNowPage(page) {
            this.curPage = page
            this.getTableList(this.curPage);
        },

        //답변 등록
        async submitQueryAnsw() {
            let data = {
                param: {
                    qst_no: this.selected.qst_no,
                    status: 1 , //  1  "답변완료"
                    answer: this.answer,

                }
            }
                let result = await axios.put('/api/product/queryAns', data)
                    .catch(err => console.log(err));
                if (result.data.changedRows > 0) {
                    Swal.fire({
                    icon: "success",
                    title: "답변이 등록 되었습니다.",
                    showConfirmButton: false,
                    timer: 1500
                });
                this.$router.go(this.$router.currentRoute); //리로드는 되지만 목록은 사라짐. 다시 검색으로 눌러 찾아야함
                }
         
        },
        openQueryForm(qst_no) {
            this.selected = this.tableList.find((item)=> item.qst_no === qst_no); //tableList에서 qst_no 와 일치하는것 찾아주는 메소드 find -> selected 에 적용
        this.modalOpen = !this.modalOpen; //false였던 답변 등록창 true
    }
        },
    
    }

</script>