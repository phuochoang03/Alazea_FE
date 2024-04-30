import { formatPrice } from "../utils/formatPrice.js";
import { request } from "../utils/useRequestHelper.js";

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('#navbar');
    const scrollTop = window.scrollY;

    if (scrollTop > 0) {
        navbar.classList.add('navbar-fixed');
    } else {
        navbar.classList.remove('navbar-fixed');
    }
});

const categoryWrapperElm = document.querySelector('.category-wrapper');
const listProductsElm = document.querySelector('.list_products');
const paginationElm = document.querySelector('.pagination');
const searchFormElm = document.querySelector('.search-form');
const inputSearchElm = document.querySelector('.input-search');
const filterItemElms = document.querySelectorAll('.filter-item');

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
                <input type="checkbox" name="" id="" />
                <p>${item.name}</p>
            </li>
        `).join('');

        categoryWrapperElm.innerHTML += categoriesHtmlStr;
    } catch (error) {
        console.log('Error', error);
    }
};
renderListCategory();

// pagination
const params = {
    page: 1,
    limit: 6,
    sort: ''
};

// render products
const renderProducts = async () => {
    try {
        const queryStr = new URLSearchParams(params);
        const { data, pagination } = await request({
            url: `products?${queryStr}`,
        });

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
                            <button>Thêm vào giỏ</button>
                        </div>
                        <p class="product_name">${product.name}</p>
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
            <li class="page-item ${i === pagination .currPage ? 'active' : ''}" onclick="onGoToPage(${i});">
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
renderProducts();

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

document.onNextPage = onNextPage;
document.onPrevious = onPrevious;
document.onGoToPage = onGoToPage;