import { request, requestWithToken } from "../utils/useRequestHelper.js"
import { formatPrice } from "../utils/formatPrice.js";
import { checkAuth } from "../utils/checkAuth.js";

await checkAuth()
// tạo thanh nav cố định khi di chuỷen khỏi trang đầu
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

const loginIcon = document.getElementById("login_link")
const profileIcon = document.getElementById("profile_link")

profileIcon.innerHTML = `
    <i class="fas fa-user"></i>
    ${userInfo.name}
    `
loginIcon.style.display = "none"
profileIcon.style.display = "inline-block"

const handleGetCart = async () => {
  const products = []

  const userCartRes = await requestWithToken({
    url: "cart",
    clientId: userInfo.id,
    token: localStorage.getItem("accessToken")
  })

  userCartRes.data.products?.forEach(product => {
    const foundProduct = products.find(prod => prod.id === product._id)
    if (!foundProduct) {
      const newProduct = {
        id: product._id,
        name: product.name,
        price: product.price - ((product.price * product.discount) / 100),
        quantity: 1,
        image: product.image
      }
      products.push(newProduct)
    } else {
      foundProduct.quantity += 1
    }
  })

  var tbody = document.querySelector('#cartTable tbody');
  tbody.innerHTML = '';

  products.forEach(function (product) {
    var row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${product.image}" alt="${product.name}" width="150"></td>
      <td class="decrease-increase">
        <button class="decrease" onclick="handleRemoveProduct('${product.id}')">-</button>
        <span class="quantity">${product.quantity}</span>
        <button class="increase" onclick="handleAddProduct('${product.id}')">+</button>
      </td>
      <td>${formatPrice(product.price)}</td>
      <td class="total">${formatPrice(product.price * product.quantity)}</td>
      <td><button class="deleteItem" onclick="handleDeleteProduct('${product.id}')"><i class="fas fa-trash"></i></button></td>
    `;
    tbody.appendChild(row);
  });
}

const handleAddProduct = async (productId) => {
  const userCart = await requestWithToken({
    url: "cart",
    clientId: userInfo.id,
    token: localStorage.getItem("accessToken")
  })

  const cartProduct = userCart.data.products
  let newCartProducts = cartProduct.map(product => product._id)
  newCartProducts.push(productId)

  const res = await requestWithToken({
    url: `cart`,
    clientId: userInfo.id,
    token: localStorage.getItem("accessToken"),
    method: "PATCH",
    body: JSON.stringify(newCartProducts)
  })

  console.log({res});
  handleGetCart()

}

const handleRemoveProduct = async (productId) => {
  const userCart = await requestWithToken({
    url: "cart",
    clientId: userInfo.id,
    token: localStorage.getItem("accessToken")
  })

  const cartProduct = userCart.data.products
  const removeIndex = cartProduct.findIndex(prod => prod._id === productId)
  cartProduct.splice(removeIndex, 1);
  
  const newCartProducts = cartProduct.map(product => product._id)

  const res = await requestWithToken({
    url: `cart`,
    clientId: userInfo.id,
    token: localStorage.getItem("accessToken"),
    method: "PATCH",
    body: JSON.stringify(newCartProducts)
  })
  console.log({res});
  handleGetCart()
}

const handleDeleteProduct = async (productId) => {
  const userCart = await requestWithToken({
    url: "cart",
    clientId: userInfo.id,
    token: localStorage.getItem("accessToken")
  })

  const cartProduct = userCart.data.products
  const newCartProducts = cartProduct.filter(prod => prod._id !== productId)

  const res = await requestWithToken({
    url: `cart`,
    clientId: userInfo.id,
    token: localStorage.getItem("accessToken"),
    method: "PATCH",
    body: JSON.stringify(newCartProducts)
  })

  console.log({res});
  handleGetCart()
}

handleGetCart()

document.handleAddProduct = handleAddProduct
document.handleRemoveProduct = handleRemoveProduct
document.handleDeleteProduct = handleDeleteProduct
