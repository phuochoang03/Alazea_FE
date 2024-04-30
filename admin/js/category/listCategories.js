import {request,requestWithToken } from "../../../utils/useRequestHelper.js";
import { checkAuth } from "../../../utils/checkAuth.js";

if(await checkAuth() !== "admin") {
    document.location = "/"
}

const adminName = document.getElementById("admin_name")
adminName.innerHTML = JSON.parse(localStorage.getItem("userInfo")).name

const handleLogout = () => {
    localStorage.setItem("userInfo", JSON.stringify({}))
    localStorage.setItem("accessToken", "")
    document.location = "/logn_in/login.html"
}

const deleteCategory = async (categoryId) => {
    if (confirm(`Bạn muốn xoá danh mục sản phẩm này ?`) === true) {
        try {
            const res = await requestWithToken({
                url: `categories/${categoryId}`,
                clientId: JSON.parse(localStorage.getItem("userInfo")).id,
                token: localStorage.getItem("accessToken"),
                method: "DELETE",
            })

            if (!res.Error) {
                window.location.href = "../../pages/forms/basic_danhmuc.html"
            }
            console.log({ res });
        } catch (error) {
            console.log({ error });
        }
    }
}

const handleCategories = async () => {
    const tbody = document.getElementById("category_table")
    const res = await request({
        url: "categories",
        method: "GET",
    })
    console.log(res);

    if (res.data) {
        res.data.forEach((category, index) => {
            const trTag = document.createElement("tr")
            trTag.innerHTML = `
            <td>${index + 1}</td>
            <td>${category.name}</td>
            <td>${category.createdBy.fullName}</td>
            <td>${category.createdAt}</td>
            <td>
                <div class="spa"> 
                    <a href="../../pages/forms/sua_danh_muc.html?id=${category._id}" class="btn btn-outline-danger" role="button" aria-pressed="true"><i class="fa fa-cogs"></i></a>
                    <button onclick="deleteCategory('${category._id}')" class="btn ml-1 btn-outline-warning"><i class="fa fa-trash"></i></button>
                </div>
            </td>
            `

            tbody.appendChild(trTag)
        })
    }
}

handleCategories()

document.deleteCategory = deleteCategory
document.handleLogout = handleLogout