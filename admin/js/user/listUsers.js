import {requestWithToken } from "../../../utils/useRequestHelper.js";
import { checkAuth } from "../../../utils/checkAuth.js";

if(await checkAuth() !== "admin") {
    document.location = "/"
}

const handleRenderUsers = async () => {
    const tbodyTag = document.getElementById("user_table")

    const res = await requestWithToken({
        url: "users",
        clientId: JSON.parse(localStorage.getItem("userInfo")).id,
        token: localStorage.getItem("accessToken"),
        method: "GET",
    })
    console.log(res);
    if (res.data) {
        res.data.forEach((user, index) => {
            const trTag = document.createElement("tr")
            trTag.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>${user.createdAt}</td>
            <td>${user.role}</td>
            `

            tbodyTag.appendChild(trTag)
        })
    }
}

handleRenderUsers()
