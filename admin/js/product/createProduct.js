import { request, requestWithToken } from "../../../utils/useRequestHelper.js";

const handleRenderCategories = async() => {
    const res = await requestWithToken({
        url: "categories",
        clientId: localStorage.getItem("user_id"),
        token: localStorage.getItem("accessToken"),
        method: "GET",
    })

    const listCateOptions = []

    if(res.data) {
        res.data.map(cate => {
            const cateObj = {
                name: cate.name, 
                id: cate._id 
            }

            listCateOptions.push(cateObj)
        })
    }

    const listOptions = document.getElementById("category")
    
    listCateOptions.forEach(item => {
        const optionTag = document.createElement("option")
        optionTag.value = item.id,
        optionTag.textContent = item.name
        listOptions.appendChild(optionTag)
    })
}

const handleCreateProduct = async () => {
    const productName = createProductForm.productName.value
    const productFile = createProductForm.img.files[0]
    const productCategory = createProductForm.category.value
    const productNameDesc = createProductForm.desc.value
    const productPrice = createProductForm.price.value
    const productDiscount = createProductForm.percentDiscount.value

    const reader = new FileReader();
    reader.readAsDataURL(productFile);
    reader.onloadend = async () => {
        const productBody = {
            name: productName,
            category: productCategory,
            image: reader.result,
            description: productNameDesc,
            price: productPrice,
            discount: productDiscount
        }

        console.log(productBody);
    
        const res = await requestWithToken({
            url: "products",
            clientId: "6614e203244a9c4fe791d90d",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjE0ZTIwMzI0NGE5YzRmZTc5MWQ5MGQiLCJpYXQiOjE3MTQxMDUxODEsImV4cCI6MTcxNDcwOTk4MX0.2H6sRfraAhWvjE74348AVQwykuTQwfjIK5tJlL1-U28",
            method: "POST",
            body: JSON.stringify(productBody)
        })
    
        if(!res.Error) {
            console.log("Vo day");
            window.location.href = "../../pages/forms/basic_sanpham.html"
        }
        console.log({res});
    }


}

const handleChangeProductImage = () => {
    const previewImage = document.getElementById("preview_img")
    const productFile = createProductForm.img.files[0]
    const previewUrl = URL.createObjectURL(productFile)
    previewImage.style.display = "block"
    previewImage.src= previewUrl
}

handleRenderCategories()
document.handleCreateProduct = handleCreateProduct
document.handleChangeProductImage = handleChangeProductImage