import {request,requestWithToken } from "../../../utils/useRequestHelper.js";

const deleteCategory = async (categoryId) => {
    if (confirm(`Bạn muốn xoá danh mục sản phẩm này ?`) === true) {
        try {
            const res = await requestWithToken({
                url: `categories/${categoryId}`,
                clientId: "6614e203244a9c4fe791d90d",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjE0ZTIwMzI0NGE5YzRmZTc5MWQ5MGQiLCJpYXQiOjE3MTQxMDUxODEsImV4cCI6MTcxNDcwOTk4MX0.2H6sRfraAhWvjE74348AVQwykuTQwfjIK5tJlL1-U28",
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
                    <a href="" class="btn btn-outline-danger" role="button" aria-pressed="true"><i class="fa fa-cogs"></i></a>
                    <!-- <button onclick="updateProduct()" class="btn btn-outline-danger"><i class="fa fa-cogs"></i></button> -->
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