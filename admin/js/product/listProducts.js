import { requestWithToken } from "../../../utils/useRequestHelper.js";
import { checkAuth } from "../../../utils/checkAuth.js";

if(await checkAuth() !== "admin") {
    document.location = "/"
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

    const res = await requestWithToken({
        url: "products",
        clientId: localStorage.getItem("user_id"),
        token: localStorage.getItem("accessToken"),
        method: "GET",
    })
    console.log(res);
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
}

handleRenderProducts()

document.deleteProduct = deleteProduct