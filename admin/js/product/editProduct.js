import { request, requestWithToken } from "../../../utils/useRequestHelper.js";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
let foundProduct

const handleChangeProductImage = () => {
    const previewImage = document.getElementById("preview_img")
    const productFile = updateProductForm.img.files[0]
    const previewUrl = URL.createObjectURL(productFile)
    previewImage.style.display = "block"
    previewImage.src = previewUrl
}

const handleGetProductById = async () => {
    const previewImage = document.getElementById("preview_img")
    const listCateOptions = []

    const resCate = await requestWithToken({
        url: "categories",
        clientId: localStorage.getItem("user_id"),
        token: localStorage.getItem("accessToken"),
        method: "GET",
    })

    const resProd = await requestWithToken({
        url: `products/${productId}`,
        clientId: localStorage.getItem("user_id"),
        token: localStorage.getItem("accessToken"),
        method: "GET",
    })

    if (resCate.data) {
        resCate.data.map(cate => {
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
        if (item.id === resProd.data.category) {
            optionTag.selected = true
        }
        listOptions.appendChild(optionTag)
    })

    if (resProd.data) {
        foundProduct = resProd.data
        updateProductForm.productName.value = resProd.data.name
        updateProductForm.desc.value = resProd.data.description
        updateProductForm.price.value = resProd.data.price
        updateProductForm.percentDiscount.value = resProd.data.discount
        previewImage.src = resProd.data.image
    }
}

const handleUpdateProduct = async () => {
    const newProducts = {
        ...(updateProductForm.productName.value !== foundProduct.name && { name: updateProductForm.productName.value }),
        ...(updateProductForm.category.value !== foundProduct.category && { category: updateProductForm.category.value }),
        ...(updateProductForm.desc.value !== foundProduct.description && { description: updateProductForm.desc.value }),
        ...(+updateProductForm.price.value !== foundProduct.price && { price: +updateProductForm.price.value }),
        ...(+updateProductForm.percentDiscount.value !== foundProduct.discount && { discount: +updateProductForm.percentDiscount.value }),
    }

    if (updateProductForm.img.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(updateProductForm.img.files[0]);
        reader.onloadend = async () => {
            newProducts["image"] = reader.result
        
            const res = await requestWithToken({
                url: `products/${productId}`,
                clientId: localStorage.getItem("user_id"),
                token: localStorage.getItem("accessToken"),
                method: "PATCH",
                body: JSON.stringify(newProducts)
            })
            if(!res.Error) {
                window.location.href = "../../pages/forms/basic_sanpham.html"
            }
        }
    } else {
        const res = await requestWithToken({
            url: `products/${productId}`,
            clientId: localStorage.getItem("user_id"),
            token: localStorage.getItem("accessToken"),
            method: "PATCH",
            body: JSON.stringify(newProducts)
        })
        if(!res.Error) {
            window.location.href = "../../pages/forms/basic_sanpham.html"
        }
    }
}

handleGetProductById()
document.handleChangeProductImage = handleChangeProductImage
document.handleUpdateProduct = handleUpdateProduct