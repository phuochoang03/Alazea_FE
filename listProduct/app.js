window.addEventListener('scroll', function () {
    const navbar = document.querySelector('#navbar');
    const scrollTop = window.scrollY;

    if (scrollTop > 0) {
        navbar.classList.add('navbar-fixed');
    } else {
        navbar.classList.remove('navbar-fixed');
    }
});

const userInfo = JSON.parse(localStorage.getItem("userInfo"))

const cartIcon = document.getElementById("cart_link")
const loginIcon = document.getElementById("login_link")
const profileIcon = document.getElementById("profile_link")

profileIcon.innerHTML = userInfo.id ? `
<i class="fas fa-user"></i>
${userInfo.name}
` : ""

cartIcon.style.display = userInfo.id ? "inline-block" : "none"
loginIcon.style.display = userInfo.id ? "none" : "inline-block"
profileIcon.style.display = userInfo.id ? "inline-block" : "none"
