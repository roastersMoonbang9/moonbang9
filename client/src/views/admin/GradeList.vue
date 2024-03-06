<template>
  <div class="container">
        <form @submit.prevent >

            <label for="no">레벨</label>
            <input type="text" id="no" v-model="boardInfo.no" readonly>

            <label for="title">레벨명</label>
            <input type="text" id="title"  v-model="boardInfo.title">

            <label for="writer">적립률</label>
            <input type="text" id="writer" v-model="boardInfo.writer">    

            <label for="content">비고</label>
            <textarea id="content" style="height:200px" v-model="boardInfo.content"></textarea>

            <button type="button" class="btn btn-xs btn-info"
                                    @click="isUpdated ? boardUpdate() : boardInsert()">저장</button>

        </form>
    </div>
</template>

<script>
<script>
import axios from 'axios';

export default {
    data() {
        return {         
            boardInfo: {
                no : '',
                title : '',
                writer : '',
                content : '',
                created_date : ''
            },
            isUpdated :false
        };
    },
    created() {
        let searchNo = this.$route.query.boardNo;
        if(searchNo > 0){
            //수정
            //1) 단건조회 선행
            this.getBoardInfo(searchNo);
            //2) 저장버튼 -> 수정기능 변경
            this.isUpdated = true;
        }else{
            //등록
           this.boardInfo.created_date = this.getDate(null);
        }
    },
    methods: {
         getDate(date) {
            let dateValue = date == null ? new Date() : new Date(date);
            let year = dateValue.getFullYear();
            let month = ('0' + (dateValue.getMonth() + 1)).slice(-2);
            let day = ('0' + dateValue.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        },
        async boardInsert(){
            let data = { 
                param : {
                    title : this.boardInfo.title,
                    writer : this.boardInfo.writer,
                    content : this.boardInfo.content,
                    created_date : this.boardInfo.created_date
                } 
            };

            let result = await axios.post("/api/boards", data)
                               .catch(err => console.log(err));

            let info = result.data.insertId;
            if(info > 0){
                alert('등록되었습니다.');
                this.boardInfo.no = info;
            }
        },
        async getBoardInfo(no) {
             let result = await axios.get("/api/boards/" + no)
                                .catch(err => console.log(err));
                                
             let newDate = this.getDate(result.data.created_date);
             result.data.created_date = newDate;

             this.boardInfo = result.data;      
        },
        async boardUpdate(){
            let data = { 
                param : {
                    title : this.boardInfo.title,
                    writer : this.boardInfo.writer,
                    content : this.boardInfo.content,
                    created_date : this.boardInfo.created_date
                } 
            };

            let result = await axios.put("/api/boards/"+this.boardInfo.no, data)
                               .catch(err => console.log(err));

            let info = result.data.changedRows;
            if(info > 0){
                alert('수정되었습니다.'); 
            }
        }
    }
}
</script>