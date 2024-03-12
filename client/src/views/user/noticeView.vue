<template>
    <div class="myContent" style="float: none;">
        <div class="titleSection">
			<h3>공지게시판</h3>
		</div>
        <div class="mySection">
				<fieldset>
					<table class="baseTable">
						<caption>공지 목록</caption>
							<colgroup>
								 <col width="50"><col width="88"> <col width="88"><col width="50">
							</colgroup>
						<thead>
							<tr>
                                <th scope="col">공지번호</th>
								<th scope="col">제목</th>
								<th scope="col">날짜</th>
								<th scope="col">파일유무</th>
							</tr>
						</thead>
                        <!-- {{ reviewList }} -->
						<tbody>
	                        <tr v-for="(table, idx) in tableList" :key="idx">
								<td>{{ table.notice_no }}</td>
								<td>{{ table.title }}</td>
                                <td>{{ getDate(table.notice_dt) }}</td>
                                <td v-if="notics == null">O</td><td v-else>X</td>
            				</tr>
	                        <tr v-if="tableList.length == 0">
								<td colspan="4">공지내역이 없습니다.</td>
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
            checkSearch : "1",
                searched : this.$store.state.userStore.mem_no,
                
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
            // 공지 리스트
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
                        offset : (curPage - 1) * this.pageSize
                    }
                }
                let result = await axios.post("/api/notice/noticeList", data)
                                        .catch(err => console.log(err));
                console.log(result);
                this.tableList = result.data;
            },
            // 테이블 행 총 갯수 가져오기
            async getTableCount() {
                let result = await axios.post(`/api/notice/noticeCount`) 
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
                let res = null;
                let date = new Date(days);
                let y = date.getFullYear();
                let m = ("0" + (date.getMonth() + 1)).slice(-2);
                let d = ("0" + date.getDate()).slice(-2);

                res = `${y}년${m}월${d}일`;

            return res;
            },
            //오늘 날짜 계산
            getDateToday() {
              let res = null;
              let date = new Date();
              let y = date.getFullYear();
              let m = ("0" + (date.getMonth() + 1)).slice(-2);
              let d = ("0" + date.getDate()).slice(-2);
            
              res = `${y}-${m}-${d}`;
            
              return res;
            },
        }
    }
</script>

<style>

</style>