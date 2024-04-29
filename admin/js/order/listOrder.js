import {requestWithToken } from "../../../utils/useRequestHelper.js";

const handleRenderOrders = async () => {
    const tbody = document.getElementById("order_table")
    const res = await requestWithToken({
        url: "orders",
        clientId: "6614e203244a9c4fe791d90d",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjE0ZTIwMzI0NGE5YzRmZTc5MWQ5MGQiLCJpYXQiOjE3MTQxMDUxODEsImV4cCI6MTcxNDcwOTk4MX0.2H6sRfraAhWvjE74348AVQwykuTQwfjIK5tJlL1-U28",
        method: "GET",
    })

    if (res.data) {
        res.data.forEach((order, index) => {
            const trTag = document.createElement("tr")
            trTag.innerHTML = `
            <td>${index + 1}</td>
            <td> ${order.trackingNumber} </td>
            <td> ${order.createdAt} </td>
            <td> ${order.status} </td>
            <td> ${order.shippingVendor} </td>
            <td>
              ${order.status === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán'} </td>
            <td> ${order.createdBy.fullName} </td>
            <td> ${order.totalPayment} </td>
            <td>
                <div class="spa"> 
                <a href="pages/forms/sua_don_hang.html" class="btn btn-outline-danger" role="button" aria-pressed="true"><i class="fa fa-cogs"></i></a>

                    <!-- <button onclick="updateProduct()" class="btn btn-outline-danger"><i class="fa fa-cogs"></i></button> -->
                </div>
            </td>
            `

            tbody.appendChild(trTag)
        })
    }
}

handleRenderOrders()

document.deleteOrder = deleteOrder