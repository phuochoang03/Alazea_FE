import { requestWithToken } from "../../../utils/useRequestHelper.js";
import { checkAuth } from "../../../utils/checkAuth.js";

if(await checkAuth() !== "admin") {
    document.location = "/"
}

const adminName = document.getElementById("admin_name")
adminName.innerHTML = JSON.parse(localStorage.getItem("userInfo")).name

const paginationElm = document.getElementById('pagination');

const params = {
    page: 1,
    limit: 10,
};

const handleLogout = () => {
    localStorage.setItem("userInfo", JSON.stringify({}))
    localStorage.setItem("accessToken", "")
    document.location = "/logn_in/login.html"
}

const deleteProduct = async (productId) => {
    if (confirm(`Bạn muốn xoá sản phẩm này ?`) === true) {
        try {
            const res = await requestWithToken({
                url: `products/${productId}`,
                clientId: JSON.parse(localStorage.getItem("userInfo")).id,
                token: localStorage.getItem("accessToken"),
                method: "DELETE",
            })

            if (!res.Error) {
                window.location.href = "../../pages/forms/basic_sanpham.html"
            }
            console.log({ res });
        } catch (error) {
            console.log({ error });
        }
    }
}

const handleRenderProducts = async () => {
    const tbodyTag = document.getElementById("product_table")
    tbodyTag.innerHTML = ""
    const res = await requestWithToken({
        url: `products?page=${params.page}&limit=${params.limit}`,
        clientId: localStorage.getItem("user_id"),
        token: localStorage.getItem("accessToken"),
        method: "GET",
    })
    if (res.data) {
        res.data.forEach((product, index) => {
            const trTag = document.createElement("tr")
            trTag.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>
                <img src="${product.image}" class="img-fluid img-thumbnail" style="object-fit: cover; object-position: center;" alt="Sheep">
            </td>
            <td>${product?.category?.name}</td>
            <td>${product.createdBy.fullName}</td>
            <td>${product.createdAt}</td>
            <td>
                <div class="spa"> 
                    <a href="../../pages/forms/sua_san_pham.html?id=${product._id}" class="btn btn-outline-danger" role="button" aria-pressed="true"><i class="fa fa-cogs"></i></a>
                    <!-- <button onclick="updateProduct()" class="btn btn-outline-danger"><i class="fa fa-cogs"></i></button> -->
                    <button onclick="deleteProduct('${product._id}')" class="btn ml-1 btn-outline-warning"><i class="fa fa-trash"></i></button>
                </div>
            </td>
            `

            tbodyTag.appendChild(trTag)
        })
    }

    const pagination = res.pagination
    const totalPage = Math.ceil(pagination.total / pagination.limit);
    let paginationHtmlStr = '';
    if (pagination.currPage > 1) {
        paginationHtmlStr += `<li class="page-item" onclick="onPrevious();" style="list-style-type: none;">
        <a class="page-link">Previous</a>
        </li>`;
    };

    for (let i = 1; i <= totalPage; i++) {
        paginationHtmlStr += `
        <li class="page-item ${i === pagination.currPage ? 'active' : ''}" onclick="onGoToPage(${i});"  style="list-style-type: none;">
            <a class="page-link">${i}</a>
        </li>
        `;
    };

    if (pagination.currPage < totalPage) {
        paginationHtmlStr += `
        <li class="page-item" onclick="onNextPage();"  style="list-style-type: none;">
            <a class="page-link">Next</a>
        </li>
        `;
        };

    paginationElm.innerHTML = paginationHtmlStr;
}

const onNextPage = () => {
    params.page = params.page += 1;
    handleRenderProducts();
};

const onPrevious = () => {
    params.page = params.page -= 1;
    handleRenderProducts();
};

const onGoToPage = (page) => {
    params.page = page;
    handleRenderProducts();
}


handleRenderProducts()

document.onNextPage = onNextPage;
document.onPrevious = onPrevious;
document.onGoToPage = onGoToPage;
document.deleteProduct = deleteProduct
document.handleLogout = handleLogout