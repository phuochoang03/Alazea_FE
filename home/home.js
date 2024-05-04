import { request } from "../utils/useRequestHelper.js";
const userInfo = JSON.parse(localStorage.getItem("userInfo"))

const cartIcon = document.getElementById("cart_link")
const loginIcon = document.getElementById("login_link")
const profileIcon = document.getElementById("profile_link")
const logoutIcon = document.getElementById("logout_link")

profileIcon.innerHTML = userInfo.id ? `
  <i class="fas fa-user"></i>
  ${userInfo.name}
  ` : ""

cartIcon.style.display = userInfo.id ? "inline-block" : "none" 
loginIcon.style.display = userInfo.id ? "none" : "inline-block"
profileIcon.style.display = userInfo.id ? "inline-block" : "none" 
logoutIcon.style.display = userInfo.id ? "inline-block" : "none" 


window.addEventListener('scroll', function () {
  const navbar = document.querySelector('#navbar');
  const scrollTop = window.scrollY;

  if (scrollTop > 0) {
    navbar.classList.add('navbar-fixed');
  } else {
    navbar.classList.remove('navbar-fixed');
  }
});

const res = await request({ url: "categories?limit=5", method: "GET" })
const resAllProducts = await request({ url: "products?limit=8", method: "GET" })
const listProduct = []

const handleLogout = () => {
  localStorage.setItem("userInfo", JSON.stringify({}))
  localStorage.setItem("accessToken", "")
  document.location = "/logn_in/login.html"
}

const newProductsZone = document.getElementById("sanphammoi")
resAllProducts.data.forEach(product => {
  var demo = '<div class="col-3">';
  demo += `<a href="/detail/detail.html?id=${product._id}">`;
  demo += '<div class="card" style="width: 18rem; border: none">';
  demo += '<img src="' + product.image + '" class="card-img-top" style="height: 170px; width: 270px; border: none;">';
  demo += '<div class="card-body">';
  demo += '</div>';
  demo += '</a>';
  demo += '</div>';
  newProductsZone.innerHTML += demo;
})


function ShowProducts(products) {
  document.getElementById("picture").innerHTML = ""
  products.forEach(product => {
    var demo = '<div class="col-3">';
    demo += `<a href="/detail/detail.html?id=${product._id}">`;
    demo += '<div class="card" style="width: 18rem; border: none">';
    demo += '<img src="' + product.image + '" class="card-img-top" style="height: 170px; width: 270px; border: none;">';
    demo += '<div class="card-body">';
    demo += '</div>';
    demo += '</a>';
    demo += '</div>';
    document.getElementById("picture").innerHTML += demo;
  })
}

const handleShowAllProduct = () => {
  ShowProducts(listProduct.slice(0, 8))
}

const getCategories = async () => {
  const listCate = document.getElementById("list_categories")
  res.data.forEach((category) => {
    const divTag = document.createElement("div")
    divTag.classList.add("cate_item")
    divTag.onclick = () => ShowProducts(category.products)
    divTag.textContent = category.name
    listProduct.push(...category.products.splice(0, 2))
    listCate.appendChild(divTag)
  })
  handleShowAllProduct()
}

getCategories()
document.handleShowAllProduct = handleShowAllProduct
document.handleLogout = handleLogout