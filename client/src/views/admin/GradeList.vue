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
          <tr v-for="(grade, idx) in gradeList" :key="idx"  >
            <td>{{ grade.grd_no }}</td>
            <td>{{ grade.grd_name }}</td>
            <td><span v-if="!editMode">{{ grade.rwd_pct }}</span>
            <input v-else type="number" v-model="editedList[idx].rwd_pct"><span v-if="editMode"> %</span></td>
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
            <button type="button" class="btn btn-xs btn-info" @click="modifyPct()" v-if="!editMode">수정</button>
            <button type="button" class="btn btn-xs btn-info" @click="gradeUpdate()" v-if="editMode">저장</button>

    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {         
            gradeList:[],
            editedList: [],
            editMode: false 
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
      modifyPct(){
        this.editMode = !this.editMode; //수정폼 boolean으로 true false 체크
        if (this.editMode) { //true일 경우 
        this.editedList = [...this.gradeList]; // ...연산자로 gradeList배열 복사 
      }
      },

        async gradeUpdate(){
          let change = false;
          for (let i = 0; i < this.editedList.length; i++) {
            let data = { 
                param : {
                    grd_no : this.editedList[i].grd_no,
                    grd_name : this.editedList[i].grd_name,
                    rwd_pct : this.editedList[i].rwd_pct,
                    grd_level : this.editedList.grd_level
                } 
            };

            let result = await axios.put("/api/user/grade/"+this.editedList[i].grd_no, data)
                               .catch(err => console.log(err));

            if(result.data.changedRows > 0){
              change = true;
                this.editMode = false; //수정모드에서 자동으로 나감
              } ;
            }
        if(change){
          Swal.fire('수정되었습니다.'); 
        }
      },
    }
  }
      
</script>