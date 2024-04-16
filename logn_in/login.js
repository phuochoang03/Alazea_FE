//Đang nhap
var login = [
    {
        nameuse: 'Admin',
        email: 'admin@gmail.com',
        tennguoidung: 'admin',
        matkhau: '123456',
    },
    {
        nameuse: 'Admin1',
        email: 'admin1@gmail.com',
        tennguoidung: 'admin1',
        matkhau: '1234567',
    },
    {
        nameuse: 'Custumer',
        email: 'custumer@gmail.com',
        tennguoidung: 'custumer',
        matkhau: '123456',
    },
    {
        nameuse: 'Custumer1',
        email: 'custumer1@gmail.com',
        tennguoidung: 'custumer1',
        matkhau: '123456',
    },
];

function savelocalstoragelogin() {
    localStorage.setItem('login' ,JSON.stringify(login));
}

function LoadlocalStoragelogin() {
    var loginStr = localStorage.getItem('login');
    if (loginStr) {
        login = JSON.parse(loginStr);
    }
}
LoadlocalStoragelogin();

function savelogin() {
    var matkhaumoi = document.getElementById('matkhau').value;
    var kiemtramatkhau = document.getElementById('kiemtramatkhau').value;
    var email = document.getElementById('email').value;
    var tennguoidung = document.getElementById('nameuse').value;
    var loginMessagenew = document.getElementById('login-message-1');

    if (tennguoidung.trim() === '') {
        loginMessagenew.textContent = '⚠️Vui lòng nhập tên!';
        return;
    }

    if (email.trim() === '') {
        loginMessagenew.textContent = '⚠️Vui lòng nhập email!';
        return;
    } 

    if (tennguoidung.trim() === '') {
        loginMessagenew.textContent = '⚠️Vui lòng nhập tên người dùng!';
        return;
    }

    if (matkhaumoi.trim() === '') { 
        loginMessagenew.textContent = '⚠️Vui lòng nhập mật khẩu!';
        return;
    } else if (matkhaumoi.trim().length <= 5) { 
        loginMessagenew.textContent = '⚠️Mật khẩu phải có ít nhất 6 ký tự!';
        return;
    }

    if (kiemtramatkhau ==='') {
        loginMessagenew.textContent = '⚠️Bạn chưa xác nhận lại mật khẩu!!!'
    }

    if (matkhaumoi !== kiemtramatkhau) {
        loginMessagenew.textContent = '⚠️Mật khẩu mới và xác nhận mật khẩu không khớp!';
        return;
    }

    var b = {       
        email: email,
        tennguoidung: tennguoidung,
        matkhau: matkhaumoi,
    };

    login.push(b);
    savelocalstoragelogin();
    console.log(b);
    alert('Đăng ký thành công!');
    toggleForms(); // Hiển thị form đăng nhập sau khi đăng ký thành công
}


//chuyển từ trang đang nhập sang đăng kí
function toggleForms() {
    var loginContainer = document.getElementById('login-container');
    var registerContainer = document.getElementById('register-container');

    if (loginContainer.style.display === 'none') {
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
    } else {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    }
}

// Hàm kiểm tra thông tin đăng nhập
function checklogin() {
    var ktremail = document.getElementById('checkemail').value;
    var password = document.getElementById('checkmatkhau').value;
    LoadlocalStoragelogin(); // Đảm bảo dữ liệu được load trước khi kiểm tra
    for (var i = 0; i < login.length; i++) {
        if (login[i].email === ktremail && login[i].matkhau === password) {
            alert('Đăng nhập thành công!');
            window.location.href = '/home/home.html';
            return true;
        }
    }
    // Hiển thị thông điệp khi đăng nhập không thành công
    document.getElementById('checkmatkhau').value='';
    var loginMessage = document.getElementById('login-message');
    loginMessage.textContent = '⚠️Cảnh báo: Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại!';
    return false; // Đăng nhập không thành công
}
