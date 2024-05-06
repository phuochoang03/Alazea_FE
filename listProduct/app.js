import { formatPrice } from "../utils/formatPrice.js";
import { request, requestWithToken } from "../utils/useRequestHelper.js";

const userInfo = JSON.parse(localStorage.getItem("userInfo"))

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('#navbar');
    const scrollTop = window.scrollY;

    if (scrollTop > 0) {
        navbar.classList.add('navbar-fixed');
    } else {
        navbar.classList.remove('navbar-fixed');
    }
});

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


const categoryWrapperElm = document.querySelector('.category-wrapper');
const listProductsElm = document.querySelector('.list_products');
const paginationElm = document.querySelector('.pagination');
const searchFormElm = document.querySelector('.search-form');
const inputSearchElm = document.querySelector('.input-search');
const filterItemElms = document.querySelectorAll('.filter-item');

const handleLogout = () => {
    localStorage.setItem("userInfo", JSON.stringify({}))
    localStorage.setItem("accessToken", "")
    document.location = "/logn_in/login.html"
}

// pagination
const params = {
    page: 1,
    limit: 6,
    sort: '',
    category: ''
};


// render list category
const renderListCategory = async () => {
    try {
        const queryStr = new URLSearchParams({
            page: 1,
            limit: 9999
        })
        const { data } = await request({
            url: `categories?${queryStr}`,
        });

        const categoriesHtmlStr = data?.map(item => `
            <li class="filter_item">
                <input type="radio" name="cate_filter" id="" onchange="handleChangeCate('${item.slug}')" />
                <p>${item.name}</p>
            </li>
        `).join('');

        categoryWrapperElm.innerHTML += categoriesHtmlStr;
    } catch (error) {
        console.log('Error', error);
    }
};

renderListCategory();

const handleAddToCart = async (btnElm) => {
    console.log("Vo day");
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const userCartRes = await requestWithToken({
        url: "cart",
        clientId: userInfo.id,
        token: localStorage.getItem("accessToken"),
        method: "GET"
    })

    const listProduct = userCartRes.data.products.map(product => product._id)
    const quantity = btnElm.parentNode.querySelector('input[type="number"]').value;
    for (let index = 1; index <= quantity; index++) {
        listProduct.push(btnElm.dataset.id)
    }

    const updateCartRes = await requestWithToken({
        url: `cart`,
        clientId: userInfo.id,
        token: localStorage.getItem("accessToken"),
        method: "PATCH",
        body: JSON.stringify({newProducts: listProduct})
    })

    if (!updateCartRes.Error) {
        document.location = "../Cart/cart.html"
    }
}

// render products
const renderProducts = async () => {
    try {
        const queryStr = new URLSearchParams(params);
        const { data, pagination } = await request({
            url: `products?${queryStr}`,
        });

        listProductsElm.innerHTML = ""

        const productHtmlStr = data?.map(product => `
            <li class="product">
                <div class="product_container">
                    <div class="image">
                        <img src=${product.image}
                            alt="" fill />
                    </div>
                    <div class="product_body">
                        <div class="user_actions">
                            <input type="number" min="1" step="1" value="1" />
                            <button onclick="handleAddToCart(this)" data-id="${product._id}">Thêm vào giỏ</button>
                        </div>
                        <a href="/detail/detail.html?id=${product._id}" style="text-decoration: none">
                            <p class="product_name">${product.name}</p>
                        </a>
                        <p class="product_price">${formatPrice(product.price)}</p>
                    </div>
                </div>
            </li>
        `).join('');

        listProductsElm.innerHTML = productHtmlStr;

        // pagination
        const totalPage = Math.ceil(pagination.total / pagination.limit);
        let paginationHtmlStr = '';
        if (pagination.currPage > 1) {
            paginationHtmlStr += `<li class="page-item" onclick="onPrevious();">
            <a class="page-link">Previous</a>
            </li>`;
        };

        for (let i = 1; i <= totalPage; i++) {
            paginationHtmlStr += `
            <li class="page-item ${i === pagination.currPage ? 'active' : ''}" onclick="onGoToPage(${i});">
                <a class="page-link">${i}</a>
            </li>
            `;
        };

        if (pagination.currPage < totalPage) {
            paginationHtmlStr += `
            <li class="page-item" onclick="onNextPage();">
                <a class="page-link">Next</a>
            </li>
            `;
        };

        paginationElm.innerHTML = paginationHtmlStr;
    } catch (error) {
        console.log('Error', error);
    }
};

const handleChangeCate = async (cateSlug) => {
    try {
        params.page = 1
        params.category = cateSlug
        renderProducts()
    } catch (error) {
        console.log('Error', error);
    }
}


const onNextPage = () => {
    params.page = params.page += 1;
    renderProducts();
};

const onPrevious = () => {
    params.page = params.page -= 1;
    renderProducts();
};

const onGoToPage = (page) => {
    params.page = page;
    renderProducts();
}

// search
searchFormElm.addEventListener('submit', (e) => {
    e.preventDefault();

    params.name = inputSearchElm.value;
    params.page = 1;
    renderProducts();
});

// filter
filterItemElms.forEach(filterItem => {
    filterItem.onchange = (e) => {
        const sort = e.target.value;
        params.sort = sort;
        renderProducts();
    };
});


renderProducts();
document.onNextPage = onNextPage;
document.onPrevious = onPrevious;
document.onGoToPage = onGoToPage;
document.handleChangeCate = handleChangeCate;
document.handleAddToCart = handleAddToCart;
document.handleLogout = handleLogout