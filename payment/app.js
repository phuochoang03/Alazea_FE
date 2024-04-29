import { requestWithToken } from "../utils/useRequestHelper.js";

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

if (!userInfo.id) {
    document.location = "/login/login.html"
}

const loginIcon = document.getElementById("login_link")
const profileIcon = document.getElementById("profile_link")

profileIcon.innerHTML = `
    <i class="fas fa-user"></i>
    ${userInfo.name}
    `
loginIcon.style.display = "none"
profileIcon.style.display = "inline-block"

const buttonPayment = document.getElementById("button_payment")
const listProductPayments = document.getElementById("list_payment_products")

const res = await requestWithToken({
    url: "cart",
    clientId: userInfo.id,
    token: localStorage.getItem("accessToken")
})

const paymentProducts = []
const orderBody = {
    products: res.data.products.map(product => product._id),
    totalPayment: 0,
    shippingVendor: "GHTK",
    shippingFee: 0,
    cartId: res.data._id,
    shippingAddress: ""
}

res.data.products.forEach(product => {
    const foundProduct = paymentProducts.find(prod => prod.id === product._id)
    if (foundProduct) {
        foundProduct.quantity += 1
    } else {
        paymentProducts.push({
            id: product._id,
            name: product.name,
            discount: product.discount,
            price: product.price,
            image: product.image,
            quantity: 1
        })
    }
})

paymentProducts.forEach((product) => {
    const liTag = document.createElement('li')
    liTag.classList.add("order-product")
    liTag.innerHTML = `
        <img src="${product.image}" alt="" />
        <div class="product-info">
            <p class="name">${product.name}</p>
            <div>
                <div
                    style="display: flex; justify-content: space-between; align-items: center;">
                    <div class="price">
                        <div class="new">${product.price - ((product.price * product.discount) / 100)}</div>
                        <div class="old">${product.price}</div>
                    </div>
                    <div class="quantity">Số lượng: <span class="red">${product.quantity}</span></div>
                </div>
            </div>
        </div>
    `
    listProductPayments.appendChild(liTag)
})

const handleCalculatePayment = () => {
    const numberProduct = document.getElementById("number_product")
    const total = document.getElementById("total")
    const shippingFee = document.getElementById("shipping_fee")
    const totalPayment = document.getElementById("total_payment")
    const stepTotal = document.getElementById("step_total")
    const paymentDom = document.getElementById("payment")

    const summary = paymentProducts.reduce((acc, curr) => {
        acc.total += curr.quantity
        acc.payment += ((curr.price - ((curr.price * curr.discount) / 100)) * curr.quantity)

        return acc
    }, { total: 0, payment: 0 })

    if ([...paymentDom.classList].includes("active")) {
        numberProduct.innerHTML = summary.total
        total.innerHTML = summary.payment
        const ghtkValue = [...document.getElementById("GHTK").classList].includes("active")
        if(ghtkValue) {
            shippingFee.innerHTML = `22.000đ`
            summary.payment += 22000
            orderBody.shippingFee = 22000
        } else {
            shippingFee.innerHTML = `14.000đ`
            summary.payment += 14000
            orderBody.shippingFee = 14000
        }
        totalPayment.innerHTML = summary.payment
    } 
    orderBody.totalPayment = summary.payment
    stepTotal.innerHTML = summary.payment
}

const handleChangeStep = (step) => {
    switch (step) {
        case 1:
            document.getElementById("info").classList.add("active")
            document.getElementById("payment").classList.remove("active")
            document.getElementById("first-step").classList.add("active")
            document.getElementById("last-step").classList.remove("active")
            buttonPayment.innerHTML = 'Tiếp tục'
            break;
        case 2:
            const addressInfo = document.getElementById("addressInfo")
            document.getElementById("payment").classList.add("active")
            document.getElementById("info").classList.remove("active")
            document.getElementById("first-step").classList.remove("active")
            document.getElementById("last-step").classList.add("active")
            buttonPayment.innerHTML = 'Thanh toán'

            const province = guestAddress.province.value
            const district = guestAddress.district.value
            const ward = guestAddress.ward.value
            const street = guestAddress.street.value
            const no = guestAddress.no.value

            addressInfo.innerHTML = `
            <div class="quote-block-item">
                <p class="quote-block-title">Khách hàng</p>
                <p class="quote-block-value">${userInfo.name}</p>
            </div>
            <div class="quote-block-item">
                <p class="quote-block-title">Số điện thoại</p>
                <p class="quote-block-value">${userInfo.phoneNumber}</p>
            </div>
            <div class="quote-block-item">
                <p class="quote-block-title">Nhận hàng tại</p>
                <p class="quote-block-value capitalize text-right" style="max-width: 400px;">
                    Số ${no}, Đường ${street}, phường ${ward}, quận ${district}, ${province}
                </p>
            </div>
            `

            break;
        default:
            break;
    }
    handleCalculatePayment()
}

const handleChangeShippingVendor = (vendorCode) => {
    switch (vendorCode) {
        case "GHTK":
            orderBody.shippingVendor = "GHTK"
            document.getElementById("GHTK").classList.add("active")
            document.getElementById("VT").classList.remove("active")
            break;
        case "VT":
            orderBody.shippingVendor = "VT"
            document.getElementById("VT").classList.add("active")
            document.getElementById("GHTK").classList.remove("active")
            break;
        default:
            break;
    }
    handleCalculatePayment()
}

buttonPayment.addEventListener("click", async () => {
    const infoDom = document.getElementById("info")
    const paymentDom = document.getElementById("payment")
    if ([...infoDom.classList].includes("active")) {
        handleChangeStep(2)
    } else {
        const province = guestAddress.province.value
        const district = guestAddress.district.value
        const ward = guestAddress.ward.value
        const street = guestAddress.street.value
        const no = guestAddress.no.value

        const checkAddressRes = await requestWithToken({
            url: "shipping-address/check",
            method: "POST",
            clientId: userInfo.id,
            token: localStorage.getItem("accessToken"),
            body: JSON.stringify({
                province,
                district,
                ward,
                street,
                no
            })
        })

        if(checkAddressRes.Error) {
            const newAddressRes = await requestWithToken({
                url: "shipping-address",
                method: "POST",
                clientId: userInfo.id,
                token: localStorage.getItem("accessToken"),
                body: JSON.stringify({
                    province,
                    district,
                    ward,
                    street,
                    no
                })
            })
            orderBody.shippingAddress = newAddressRes.data._id
        } else {
            orderBody.shippingAddress = checkAddressRes.data._id
        }

        const orderRes = await requestWithToken({
            url: "orders",
            method: "POST",
            clientId: userInfo.id,
            token: localStorage.getItem("accessToken"),
            body: JSON.stringify(orderBody)
        })
    }
})

handleChangeShippingVendor()
handleCalculatePayment()
document.handleChangeStep = handleChangeStep
document.handleChangeShippingVendor = handleChangeShippingVendor