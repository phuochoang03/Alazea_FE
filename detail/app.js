import { request, requestWithToken } from "../utils/useRequestHelper.js"
import { formatPrice } from "../utils/formatPrice.js";

// Side functions
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
const logoutIcon = document.getElementById("logout_link")

profileIcon.innerHTML = userInfo.id ? `
<i class="fas fa-user"></i>
${userInfo.name}
` : ""

cartIcon.style.display = userInfo.id ? "inline-block" : "none"
loginIcon.style.display = userInfo.id ? "none" : "inline-block"
profileIcon.style.display = userInfo.id ? "inline-block" : "none"
logoutIcon.style.display = userInfo.id ? "inline-block" : "none"

// Main functions
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
let quantity = 1

const handleLogout = () => {
    localStorage.setItem("userInfo", JSON.stringify({}))
    localStorage.setItem("accessToken", "")
    document.location = "/logn_in/login.html"
}

const handleRenderProduct = async () => {
    const res = await request({
        url: `products/${productId}`,
        method: "GET"
    })

    const product = res.data
    const productContainer = document.getElementById("product_container")

    productContainer.innerHTML = `
        <img 
            src="${product.image}" 
            alt=""
            class="product_image"
        />
        <div class="product_info">
            <div class="product_wrapper">
                <p class="product_name">${product.name}</p>
                <span class="product_price">${formatPrice(product.price)}</span>
                <p class="desc">${product.description}</p>
                <div class="action_container">
                    <ul class="quantity">
                        <li class="quantity_action" onclick="handleChangeQuantity('decrease')">-</li>
                        <li class="quantity_value" id="quantity_value">${quantity}</li>
                        <li class="quantity_action" onclick="handleChangeQuantity('increase')">+</li>
                    </ul>
                    <div 
                        class="add_cart" 
                        style="text-decoration: none;"
                        onclick="handleAddToCart('${product._id}')"
                    >
                        Thêm vào giỏ hàng
                    </div>
                </div>
            </div>
            <p class="product_category">
                Danh mục: <span>${product.category.name}</span>
            </p>
        </div>
    `
}

const handleChangeQuantity = async (action) => {
    switch (action) {
        case "increase":
            quantity += 1
            break;
        case "decrease":
            quantity = quantity <= 1 ? quantity : quantity - 1
            break;
        default:
            break;
    }

    const quantityValue = document.getElementById("quantity_value")
    quantityValue.innerHTML = quantity
}

const handleAddToCart = async (productId) => {
    const resUserCart = await requestWithToken({
        url: "cart",
        clientId: userInfo.id,
        token: localStorage.getItem("accessToken"),
        method: "GET"
    })

    const cartProducts = resUserCart.data.products

    let newCartProducts = []
    const listNewProductsId = []

    cartProducts.forEach(product => {
        newCartProducts.push(product._id)
    })

    for (let i = 1; i <= quantity; i++) {
        listNewProductsId.push(productId)
    }

    newCartProducts = [...newCartProducts, ...listNewProductsId]

    const res = await requestWithToken({
        url: `cart`,
        clientId: userInfo.id,
        token: localStorage.getItem("accessToken"),
        method: "PATCH",
        body: JSON.stringify(newCartProducts)
    })

    if (res.status === 200) {
        document.location = "../Cart/cart.html"
    }
}


handleRenderProduct()
document.handleAddToCart = handleAddToCart
document.handleChangeQuantity = handleChangeQuantity
document.handleLogout = handleLogout