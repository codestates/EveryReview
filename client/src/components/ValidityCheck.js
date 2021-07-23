// 비밀번호 유효성검사
const passwordCheck = (password) => {
    const regex = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    if(password.length < 8 && password.length > 0) {
        return "1"
    } else if(!regex.test(password)) {
        if(password.length === 0) {
            return 'nonvalidated'
        }
        return "2"
    } else {
        return 'nonvalidated'
    }
}

// 이메일 유효성검사
