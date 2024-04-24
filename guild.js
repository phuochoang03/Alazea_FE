// Bước 1: Import hàm để gọi lấy dữ liệu
import { request, requestWithToken } from "./utils/useRequestHelper.js";

// request -> hàm này gọi đối với những chức năng không cần đăng nhập
// Những chức năng không cần đăng nhập:
// 1. Đăng nhập / Đăng Ký
// 2. Lấy chi tiết danh mục
// 3. Lấy tất cả danh mục
// 4. Lấy tất cả sản phẩm
// 5. Lấy tất cả sản phẩm theo slug
// 6. Lấy sản phẩm theo id
// requestWithToken -> hàm này gọi đối với những chức năng bắt buộc đăng nhập
// Tất cả chức năng ngoài 6 chức năng trên đều dùng requestWithToken để gọi

// Ví dụ về cách gọi đối với từng phương thức

// GET -> Lấy dữ liệu
// Không cần đăng nhập
const getDataNoToken = async () => {
    const res = await request({
        url: "url của từng api đã có trong link gửi trong zalo",
        method: "GET"
    })
}
// Cần đăng nhập
const getDataWithToken = async () => {
    const res = await requestWithToken({
        url: "url của từng api đã có trong link gửi trong zalo",
        clientId: localStorage.getItem("user_id"),
        token: localStorage.getItem("accessToken"),
        method: "GET"
    })
}

// POST -> Tạo/Gửi dữ liệu
// Không cần đăng nhập
const postData = async () => {
    const res = await request({
        url: "url của từng api đã có trong link gửi trong zalo",
        method: "POST",
        body: "Đưa cái cần truyền vô đây"
    })
}
// Cần đăng nhập
const postDataWithToken = async () => {
    const res = await requestWithToken({
        url: "url của từng api đã có trong link gửi trong zalo",
        clientId: localStorage.getItem("user_id"),
        token: localStorage.getItem("accessToken"),
        method: "POST",
        body: "Đưa cái cần truyền vô đây"
    })
}

// PATCH -> Cập nhập dữ liệu
const patchDataWithToken = async () => {
    const res = await requestWithToken({
        url: "url của từng api đã có trong link gửi trong zalo",
        clientId: localStorage.getItem("user_id"),
        token: localStorage.getItem("accessToken"),
        method: "PATCH",
        body: "Đưa cái cần truyền vô đây"
    })
}

// DELETE -> Xoá dữ liệu
const deleteDataWithToken = async () => {
    const res = await requestWithToken({
        url: "url của từng api đã có trong link gửi trong zalo",
        clientId: localStorage.getItem("user_id"),
        token: localStorage.getItem("accessToken"),
        method: "DELETE",
        body: "Đưa cái cần truyền vô đây"
    })
}

// Khi đã tạo hàm xong thì mọi người cần gõ đoạn code để đẩy hàm ra cho file HTML có thể sài được
// Công thức: document.[tên hàm cần đưa ra] = [tên hàm cần đưa ra]
document.getDataNoToken = getDataNoToken

// Sau đó mọi người cần sửa lại file js đã import bên html thành module
// Ví dụ
// Hiện tại: <script src="./home/home.js"></script>
// Phải sửa lại thành: <script type="module" src="./home/home.js"></script>
// Tức là thêm type="module" vào khi import 

// VÍ DỤ về những hàm tui đã làm mẫu cho mọi người tham khảo
// 1. File home\home.js -> Hàm getCategories
// 2. File admin\js\product\listProducts.js -> hàm deleteProduct và handleRenderProducts
// 3. File admin\js\product\editProduct.js -> hàm handleUpdateProduct và handleGetProductById
// 4. File admin\js\product\createProduct.js -> hàm handleRenderCategories và handleCreateProduct