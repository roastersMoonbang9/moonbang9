<template>
  <div class="container">
    <h1 style="padding: 15px; font-size: 27px; margin: 30px;">회원 레벨 관리</h1>
    <table class="table table-hover" style="font-size: 15px;">
        <thead>
          <tr class="table-primary">
            <th>레벨</th>
            <th>레벨명</th>
            <th>적립률</th>
            <th>비고(기준 금액)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(grade, idx) in gradeList" :key="idx" >
            <td>{{ grade.grd_no }}</td>
            <td>{{ grade.grd_name }}</td>
            <td><input type="number" :value="grade.rwd_pct" ><span> %</span></td>
            <td>{{ grade.grd_level }}원 이상 구매</td>
          </tr>
          <tr>
            <td>5</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div style="text-align: center;">
            <button type="button" class="btn btn-xs btn-info" @click="this.saveUpdate()">저장</button>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {         
            gradeList: {
                grd_no : '',
                grd_name : '',
                rwd_pct : '',
                grd_level : ''
            } 
        };
    },
    created() {
      this.getGradeList(); // 비동기작업
    },
      methods : 
      {
        async getGradeList() { // 동기작업
        let result = await axios.get('/api/user/grade')
                                .catch(err => console.log(err));
        this.gradeList = result.data;
      },
    methods: {
     changePct(){


     },
        async gradeUpdate(){
            let data = { 
                param : {
                    grd_no : this.gradeList.grd_no,
                    grd_name : this.gradeList.grd_name,
                    rwd_pct : this.gradeinfo.pct,
                    grd_level : this.gradeList.grd_level
                } 
            };

            let result = await axios.put("/api/user/grade/"+this.gradeList.no, data)
                               .catch(err => console.log(err));

            let info = result.data.changedRows;
            if(info > 0){
                alert('수정되었습니다.'); 
            }
        }}}}
      
</script>