import { request } from "../utils/useRequestHelper.js"

// Hàm kiểm tra thông tin đăng nhập
const checklogin = async () => {
    var ktrPhone = document.getElementById('checkphone').value;
    var password = document.getElementById('checkmatkhau').value;


    if(!ktrPhone.trim().length || !password.trim().length) {
        const loginMessage = document.getElementById('login-message');
        loginMessage.innerHTML = "Password and/or phone number is empty !";
        return
    }

    const body = {
        phone: ktrPhone,
        password
    }

    const res = await request({
        url: "auth/login",
        method: "POST",
        body: JSON.stringify(body)
    })

    // Lỗi là vô đây (Lưu ý ghi đúng y Error -> E viết hoa)
    if (res.Error) {
        const loginMessage = document.getElementById('login-message');
        loginMessage.innerHTML = res.Error.message;
    } else {
        const userInfo = {
            id: res.data.foundUser._id,
            name: res.data.foundUser.fullName,
            phoneNumber: res.data.foundUser.phone,
        }
        localStorage.setItem("userInfo", JSON.stringify(userInfo))
        localStorage.setItem("accessToken", res.data.tokens.accessToken)
        window.location = "/"
    }
}

const checkRegister = async () => {
    var username = document.getElementById('nameUser').value;
    var phone = document.getElementById('phone').value;
    var password = document.getElementById('matkhau').value;
    var checkPassword = document.getElementById('kiemtramatkhau').value;
    const loginMessage = document.getElementById('login-message-1');
    if(!username.trim().length) {
        loginMessage.innerHTML = "Username is empty !";
    } else if(!phone.trim().length) {
        loginMessage.innerHTML = "Phone is empty !";
    } else if(!password.trim().length) {
        loginMessage.innerHTML = "Password is empty !";
    } else if(!checkPassword.trim().length) {
        loginMessage.innerHTML = "Confirm password is empty !";
    } else if (password.trim() !== checkPassword.trim()) {
        loginMessage.innerHTML = "Password not matches!";
    } else {
        const body = {
            fullName: username,
            password,
            confirmPassword: checkPassword,
            phone
        }
    
        const res = await request({
            url: "auth/register",
            method: "POST",
            body: JSON.stringify(body)
        })
    
        // Lỗi là vô đây (Lưu ý ghi đúng y Error -> E viết hoa)
        if (res.Error) {
            loginMessage.innerHTML = res.Error.message;
        } else {
            const userInfo = {
                id: res.data.newUser._id,
                name: res.data.newUser.fullName,
                phoneNumber: res.data.newUser.phone,
            }
            localStorage.setItem("userInfo", JSON.stringify(userInfo))
            localStorage.setItem("accessToken", res.data.tokens.accessToken)
            window.location = "/"
        }
    }

}



// //chuyển từ trang đang nhập sang đăng kí
function toggleForms() {
    var loginContainer = document.getElementById('login-container');
    var registerContainer = document.getElementById('register-container');

    if (loginContainer.style.display === 'none') {
        console.log("Vo day 1");
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
    } else {
        console.log("Vo day 2");
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    }
}


window.checklogin = checklogin
window.checkRegister = checkRegister
document.toggleForms = toggleForms