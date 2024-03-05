<template>
    <div class="container">
        <h1 style="padding: 15px; font-size: 27px;">회원 목록</h1>
        <div>
            <h4>조건검색</h4>
            <table class="table table-bordered">
                <tr>
                    <th>검색어</th>
                    <td>
                        <select class="form-select" v-model="checkSearch" aria-label="Default select example">
                            <option value="1">아이디</option>
                            <option value="2">회원명</option>
                        </select>
                    </td>
                    <td colspan="2">
                        <input v-model="searched" class="form-control" type="text" aria-label="default input example">
                    </td>
                </tr>
                <tr>
                    <th>기간검색</th>
                    <td>
                        <select class="form-select" v-model="checkDate" aria-label="Default select example">
                            <option value="1">가입일</option>
                            <option value="2">탈퇴일</option>
                        </select>
                    </td>
                    <td>
                        <div>
                        <input class="form-control" v-model="getDate1" type="date" aria-label="default input example">
                        ~<input class="form-control" v-model="getDate2" type="date" aria-label="default input example">
                        </div>
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
                    <th>등급검색</th>
                    <td colspan="3">
                        <ul class="nav" >
                            <li class="nav-item">
                                <input class="form-check-input" type="radio">
                                <label class="form-check-label">
                                    전체&nbsp;&nbsp;
                                </label>
                            </li>
                            <li class="nav-item">
                                <input class="form-check-input" type="radio">
                                <label class="form-check-label">
                                    WHITE&nbsp;&nbsp;
                                </label>
                            </li>
                            <li class="nav-item">
                                <input class="form-check-input" type="radio">
                                <label class="form-check-label">
                                    BASIC&nbsp;&nbsp;
                                </label>
                            </li>
                            <li class="nav-item">
                                <input class="form-check-input" type="radio">
                                <label class="form-check-label">
                                    VIP&nbsp;&nbsp;
                                </label>
                            </li>
                            <li class="nav-item">
                                <input class="form-check-input" type="radio">
                                <label class="form-check-label">
                                    GOLD
                                </label>
                            </li>
                        </ul>
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
                checkSearch : "1",
                searched : null,
                getDate1 : null,
                checkDate : "1",
                getDate2: null
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
            },
        }
    
    }

</script>