// 비밀번호 유효성검사
const passwordCheck = (password) => {
    // 8자 이상, 대소문자 가능, 특수문자 가능
    const regex =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    if(password.length < 8 && password.length > 0) {
        return 'shortPassword'
    } else if(!regex.test(password)) {
        if(password.length === 0) {
            return 'empty'
        }
        return 'invalidPassword'
    } else {
        return 'validPassword'
    }
}

// 비밀번호 변경 유효성검사
const passwordChangeCheck = (newPassword) => {
    
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    return regex.test(newPassword)
  
}


// 사용자이름 유효성검사
const usernameCheck = (username) => {
    const regex = /^[가-힣ㄱ-ㅎa-zA-Z0-9._-]{2,}$/;
    if(username.length < 2 && username.length > 0) {
        return 'shortUsername'
    } else if(!regex.test(username)) {
        if(username.length === 0) {
            return 'validUsername'
        } else {
            return 'invalidUsername'
        }
    } else {
        return 'validUsername'
    }
}


// 이메일 유효성검사
const emailCheck = (email) => {
    // 버그수정 완료. 이메일주소에 '.'도 사용할 수 있게(구글이메일의 경우 '.'허용) 변경
    const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if(email.length > 0) {
        if(!regex.test(email)) {
            return 'invalidEmail'
        } else {
            return 'validEmail'
        }
    } else {
        return 'emptyEmail'
    }
}

// 입력값 유효성검사
const checkAll = (email, password, username) => {
    const emailRegex = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    const usernameRegex = /^[가-힣ㄱ-ㅎa-zA-Z0-9._-]{2,}$/;

    return (
        emailRegex.test(email) &&
        passwordRegex.test(password)&&
        usernameRegex.test(username)
    )
}

export { checkAll, emailCheck, usernameCheck, passwordCheck, passwordChangeCheck }