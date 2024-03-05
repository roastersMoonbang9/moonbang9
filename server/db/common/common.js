//common.js

//파일 테이블 목록 출력
const fileList = 
`SELECT file_no
		,table_cd
        ,type_cd
        ,file_path
        ,file_name
        ,file_extn
        ,ranks
FROM file 
ORDER BY file_no`;

// 각 상세 정보 fileInfo table/상품상세
const fileInfo = 
`SELECT 
		file_no
		,table_cd
        ,type_cd
        ,file_path
        ,file_name
        ,file_extn
        ,ranks
FROM file 
WHERE table_cd = ?
AND type_cd = ?`; 

// fileInsert 파일 업로드

const fileInsert = 
`INSERT INTO file 
SET ?`;

// fileUpdate 

const fileUpdate = 

`UPDATE file 
SET ? 
WHERE file_no = ?` ;

module.exports = {
    fileList,
    fileInfo,
    fileInsert,
    fileUpdate
}