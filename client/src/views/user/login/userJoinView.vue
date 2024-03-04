<template>
  <div class="userJoin">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>회원가입</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mt-5">
            <h2 class="mb-4">회원가입</h2>
            <form>
                <div class="form-group">
                    <label for="username">아이디</label>
                    <input type="text" class="form-control" id="username" placeholder="아이디를 입력하세요">
                    <small id="usernameHelp" class="form-text text-muted">영문, 숫자, 밑줄(_)만 사용 가능합니다.</small>
                    <button type="button" class="btn btn-primary mt-2" onclick="checkUsername()">아이디 중복 확인</button>
                </div>
                <div class="form-group">
                    <label for="password">비밀번호</label>
                    <input type="password" class="form-control" id="password" placeholder="비밀번호를 입력하세요">
                </div>
                <div class="form-group">
                    <label for="confirmPassword">비밀번호 확인</label>
                    <input type="password" class="form-control" id="confirmPassword" placeholder="비밀번호를 다시 입력하세요">
                </div>
                <div class="form-group">
                    <label for="phone">휴대폰 번호</label>
                    <input type="text" class="form-control" id="phone" placeholder="휴대폰 번호를 입력하세요">
                </div>
                <div class="form-group">
                    <label for="birthday">생년월일</label>
                    <input type="date" class="form-control" id="birthday">
                </div>
                <div class="form-group">
                    <label>성별</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gender" id="male" value="male">
                        <label class="form-check-label" for="male">남성</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gender" id="female" value="female">
                        <label class="form-check-label" for="female">여성</label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="email">이메일</label>
                    <input type="email" class="form-control" id="email" placeholder="이메일을 입력하세요">
                </div>
                <div class="form-group">
                    <label for="address">주소</label>
                    <input type="text" class="form-control" id="address" placeholder="주소를 입력하세요">
                </div>
                <div class="form-group">
                    <label for="address2">상세주소</label>
                    <input type="text" class="form-control" id="address2" placeholder="상세주소를 입력하세요">
                </div>
                <button type="submit" class="btn btn-primary">가입하기</button>
            </form>
        </div>
    </body>
  </div>
</template>

<script>
function checkUsername() {
// 아이디 중복 확인 로직을 작성합니다.
// 사용자가 입력한 아이디를 가져와서 서버에 요청하여 중복 여부를 확인합니다.
}
</script>

