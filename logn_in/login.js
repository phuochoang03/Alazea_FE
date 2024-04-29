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
        localStorage.setItem("user_id", res.data.foundUser._id)
        localStorage.setItem("accessToken", res.data.tokens.accessToken)
        window.location = "/"
    }

}

window.checklogin = checklogin

// function savelocalstoragelogin() {
//     localStorage.setItem('login' ,JSON.stringify(login));
// }

// function LoadlocalStoragelogin() {
//     var loginStr = localStorage.getItem('login');
//     if (loginStr) {
//         login = JSON.parse(loginStr);
//     }
// }
// LoadlocalStoragelogin();

// function savelogin() {
//     var matkhaumoi = document.getElementById('matkhau').value;
//     var kiemtramatkhau = document.getElementById('kiemtramatkhau').value;
//     var email = document.getElementById('email').value;
//     var tennguoidung = document.getElementById('nameuse').value;
//     var loginMessagenew = document.getElementById('login-message-1');

//     if (tennguoidung.trim() === '') {
//         loginMessagenew.textContent = '⚠️Vui lòng nhập tên!';
//         return;
//     }

//     if (email.trim() === '') {
//         loginMessagenew.textContent = '⚠️Vui lòng nhập email!';
//         return;
//     }

//     if (tennguoidung.trim() === '') {
//         loginMessagenew.textContent = '⚠️Vui lòng nhập tên người dùng!';
//         return;
//     }

//     if (matkhaumoi.trim() === '') {
//         loginMessagenew.textContent = '⚠️Vui lòng nhập mật khẩu!';
//         return;
//     } else if (matkhaumoi.trim().length <= 5) {
//         loginMessagenew.textContent = '⚠️Mật khẩu phải có ít nhất 6 ký tự!';
//         return;
//     }

//     if (kiemtramatkhau ==='') {
//         loginMessagenew.textContent = '⚠️Bạn chưa xác nhận lại mật khẩu!!!'
//     }

//     if (matkhaumoi !== kiemtramatkhau) {
//         loginMessagenew.textContent = '⚠️Mật khẩu mới và xác nhận mật khẩu không khớp!';
//         return;
//     }

//     var b = {
//         email: email,
//         tennguoidung: tennguoidung,
//         matkhau: matkhaumoi,
//     };

//     login.push(b);
//     savelocalstoragelogin();
//     console.log(b);
//     alert('Đăng ký thành công!');
//     toggleForms(); // Hiển thị form đăng nhập sau khi đăng ký thành công
// }


// //chuyển từ trang đang nhập sang đăng kí
// function toggleForms() {
//     var loginContainer = document.getElementById('login-container');
//     var registerContainer = document.getElementById('register-container');

//     if (loginContainer.style.display === 'none') {
//         loginContainer.style.display = 'block';
//         registerContainer.style.display = 'none';
//     } else {
//         loginContainer.style.display = 'none';
//         registerContainer.style.display = 'block';
//     }
// }


