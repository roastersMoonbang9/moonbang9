<template>
<div class="myContent">
		<div class="titleSection">
			<h3>주문상세조회</h3>
		</div>
			<div class="mySection">
				<fieldset>
					<table class="baseTable">
						<caption>주문배송조회 목록</caption>
							<colgroup>
								 <col width="88"><col width="88"> <col width="88"><col width="50"> <col width="130"> <col width="81"> <col width="100">
							</colgroup>
						<thead>
							<tr>
                                <th scope="col">상품</th>
								<th scope="col">상품옵션</th>
								<th scope="col">수량</th>
								<th scope="col">배송비</th>
								<th scope="col">금액</th>
								<th scope="col">주문일자</th>
								<th scope="col">주문상태</th>
							</tr>
						</thead>
						<tbody>
	                        <tr v-for="(table, idx) in tableList" :key="idx">
								<td>{{ table.prod_name }}</td>
								<td>옵션</td>
								<td>갯수</td>
								<td>배송비</td>
								<td>{{ table.total_payment }}원</td>
								<td>{{ getDate(table.ord_dt) }}</td>
								<td>{{ this.checkStatus(table.status) }}</td>
            				</tr>
	                        <tr v-if="tableList.length == 0">
								<td colspan="6">검색된 주문내역이 없습니다.</td>
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
            checkSearch : "2",
                searched : null,
                checkDate : "1",
                getDate1 : null,
                getDate2 : null,
                checkStatus1 : null,
                checkStatus2 : "1",
                checkStatus3 : "2",
                checkStatus4 : "3",
                checkStatus5 : "4",
                checkSt : null,
                totalPayment : 0,

                // 리스트
                tableList : [],
                paging : [],
                pagination : {},
                allSize : 0,  // 모든 데이터 수
                pageSize : 10, // 한 페이지에서 보여줄 데이터 수
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
                if (st == 1) {
                    st = "결제 완료"
                } else if (st == 2) {
                    st = "BASIC"
                } else if (st == 3) {
                    st = "VIP"
                } else if (st == 4) {
                    st = "GOLD"
                }
                return st;
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
                this.checkSearch = "2",
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
                await this.getTableSum();
                this.curPage = curPage;
                let data = {
                    param : {
                        limit : this.pageSize,
                        offset : (curPage - 1) * this.pageSize,
                        checkSearch : this.checkSearch,
                        searched : this.$store.state.userStore.name,
                        getDate1 : this.getDate1,
                        checkDate : this.checkDate,
                        getDate2 : this.getDate2,
                        checkSt : this.checkSt,
                        chMem : this.$store.state.userStore.mem_no
                    }
                }
                let result = await axios.post("/api/order/adOrderList", data)
                                        .catch(err => console.log(err));
                console.log(result);
                //오우야 너무 돌렸다ㅋㅋ
                let a = result.data[0]
                let b = result.data[1]
                let results = [];
                for(let i=0;i<a.length;i++){
                    let c = b[i]
                    let sum = {...a[i], ...c[0]}
                    results.push(sum)
                }
                this.tableList = results;

                console.log(results);
            },
            // 테이블 행 총 갯수 가져오기
            async getTableCount() {
                let data = {
                    param : {
                        checkSearch : this.checkSearch,
                        searched : this.$store.state.userStore.name,
                        getDate1 : this.getDate1,
                        checkDate : this.checkDate,
                        getDate2 : this.getDate2,
                        checkSt : this.checkSt,
                        chMem : this.$store.state.userStore.mem_no
                    }
                }
                let result = await axios.post(`/api/order/adOrderCount`, data) 
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
                        searched : this.$store.state.userStore.name,
                        getDate1 : this.getDate1,
                        checkDate : this.checkDate,
                        getDate2 : this.getDate2,
                        checkSt : this.checkSt,
                        chMem : this.$store.state.userStore.mem_no
                    }
                }
                let result = await axios.post(`/api/order/adOrderTotalPayment`, data) 
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
            },
             //날짜 양식변경
            getDate(days) {
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
</script>

<style>
.my10x10Wrap .myContent {
    position: relative;
}
.myContent {
    float: right;
    width: 848px;
    min-height: 703px;
    height: auto;
    height: 703px;
    padding: 40px 30px;
    background: #fff;
    font-size: 12px;
}
.myContent .titleSection {
    margin: 0 -30px 45px;
    padding: 0 30px 30px;
    background: url(//fiximage.10x10.co.kr/web2013/my10x10/bg_double_line.gif) left bottom repeat-x;
    position: relative;
}
.myContent .titleSection h3 {
    color: #000;
    font-size: 28px;
    line-height: 1;
    font-weight: bold;
}
.myContent .titleSection .list {
    margin-top: 15px;
}
fieldset, img {
    border: 0;
}
.myContent .optSelect {
    height: 20px;
}
select.optSelect {
    border: 1px solid #bbb;
    color: #666;
    font-size: 11px;
    height: 17px;
    outline-style: none;
    vertical-align: middle;
    font-weight: normal;
}
.btn:link, .btn:active, .btn:visited {
    color: #fff;
}
.btnS2 {
    font-size: 12px;
    line-height: 0.9;
    padding: 5px 8px 2px;
    vertical-align: top;
}
.baseTable {
    border-top: 2px solid #555;
    border-bottom: 1px solid #ddd;
    text-align: center;
}
.words{
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 12px;
}
.chbtn{
    border: 1px solid #ccc;
    border-radius: 20px;
    margin: 0 10px;
}
</style>