import { requestWithToken } from "../../../utils/useRequestHelper.js";

const handleUpdateOrderStatus = async (status, orderId) => {
    const res = await requestWithToken({
        url: `orders/${orderId}`,
        method: "PATCH",
        clientId: JSON.parse(localStorage.getItem("userInfo")).id,
        token: localStorage.getItem("accessToken"),
        body: JSON.stringify({ status })
    })

    if(!res.Error) {
        await handleRenderOrders();
    }
}

const handleRenderOrders = async () => {
    const tbody = document.getElementById("order_table")
    tbody.innerHTML = ''
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
                    ${
                        order.status === "PROCESSING" ? (
                            `<button 
                                onclick="handleUpdateOrderStatus('SHIPPING', '${order._id}')"
                                style="width: 150px; padding: 12px 20px; border-radius: 6px; background-color: #00bad1; color: #fff; border: none;"
                            >
                                Xác nhận đơn hàng
                            </button>`
                        ) : ""
                    }
                    ${
                        order.status === "SHIPPING" ? (
                            `<button 
                                onclick="handleUpdateOrderStatus('SHIPPED', '${order._id}')"
                                style="width: 150px; padding: 12px 20px; border-radius: 6px; background-color: #e68f3c; color: #fff; border: none;"
                            >
                                Xác nhận đã giao
                            </button>`
                        ) : ""
                    }
                    ${
                        order.status === "SHIPPED" ? (
                            `<button 
                                onclick="handleUpdateOrderStatus('PAID', '${order._id}')"
                                style="width: 150px; padding: 12px 20px; border-radius: 6px; background-color: #00cfe8 ; color: #fff; border: none;"
                            >
                                Xác nhận thanh toán
                            </button>`
                        ) : ""
                    }
                    ${
                        order.status === "PAID" ? (
                            `<button 
                                style="width: 180px; padding: 12px 20px; border-radius: 6px; background-color: #00bad1; color: #fff; border: none;"
                            >
                                Đơn hàng đã hoàn thành
                            </button>`
                        ) : ""
                    }
                    ${
                        order.status === "CANCELED" ? (
                            `<button 
                                style="width: 150px; padding: 12px 20px; border-radius: 6px; background-color: ##24b364; color: #fff; border: none;"
                            >
                                Đơn hàng đã huỷ
                            </button>`
                        ) : ""
                    }
                </div>
            </td>
            `
            tbody.appendChild(trTag)
        })
    }
}

handleRenderOrders()
document.handleUpdateOrderStatus = handleUpdateOrderStatus