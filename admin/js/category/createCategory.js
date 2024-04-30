import { request, requestWithToken } from "../../../utils/useRequestHelper.js";
import { checkAuth } from "../../../utils/checkAuth.js";

if(await checkAuth() !== "admin") {
    document.location = "/"
}

const handleCreateCategory = async () => {
    const categoryName = createCategoryForm.categoryName.value
    const res = await requestWithToken({
        url: "categories",
        method: "POST",
        clientId: JSON.parse(localStorage.getItem("userInfo")).id,
        token: localStorage.getItem("accessToken"),
        body: JSON.stringify({categoryName}),
    })

    if(!res.Error) {
        document.location = "../../pages/forms/basic_danhmuc.html"
    }
    console.log({res});
}

document.handleCreateCategory = handleCreateCategory
