<template>
    <div class="container">
        <h1 style="padding: 15px; font-size: 27px; margin: 30px;">주문 목록</h1>
        <div>
            <h4 style="margin-bottom: 20px;">조건검색</h4>
            <table class="table table-bordered">
                <tr>
                    <th>검색어</th>
                    <td>
                        <select class="form-select" aria-label="Default select example">
                            <option value="1">주문번호</option>
                            <option value="2">주문자명</option>
                        </select>
                    </td>
                    <td colspan="3">
                        <input class="form-control" type="text" aria-label="default input example">
                    </td>
                </tr>
                <tr>
                    <th>기간검색</th>
                    <td>
                        <select class="form-select" aria-label="Default select example">
                            <option value="1">주문일</option>
                            <option value="2">탈퇴일</option>
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
    </div>
</template>

<script>
    export default {
        data () {
            return {
                getDate1 : null,
                getDate2 : null
            }
        },
        methods : {
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
            }
        }
    }
</script>