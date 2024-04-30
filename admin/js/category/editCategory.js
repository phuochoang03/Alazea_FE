import { request, requestWithToken } from "../../../utils/useRequestHelper.js";
import { checkAuth } from "../../../utils/checkAuth.js";

if(await checkAuth() !== "admin") {
    document.location = "/"
}

const categoryNameInput = document.getElementById("categoryName")
const urlParams = new URLSearchParams(window.location.search);
const categoryId = urlParams.get('id');
const resCate =  await requestWithToken({
    url: `categories/${categoryId}`,
    clientId: JSON.parse(localStorage.getItem("userInfo")).id,
    token: localStorage.getItem("accessToken"),
    method: "GET",
})

categoryNameInput.value = resCate.data.name

const handleEditCategory = async () => {
    const categoryName = categoryNameInput.value
    const res = await requestWithToken({
        url: `categories/${categoryId}`,
        method: "PATCH",
        clientId: JSON.parse(localStorage.getItem("userInfo")).id,
        token: localStorage.getItem("accessToken"),
        body: JSON.stringify({name: categoryName}),
    })

    console.log({res});
    if(!res.Error) {
        document.location = "../../pages/forms/basic_danhmuc.html"
    }
}

document.handleEditCategory = handleEditCategory



