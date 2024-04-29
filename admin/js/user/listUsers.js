import {requestWithToken } from "../../../utils/useRequestHelper.js";

const handleRenderUsers = async () => {
    const tbodyTag = document.getElementById("user_table")

    const res = await requestWithToken({
        url: "users",
        clientId: "6614e203244a9c4fe791d90d",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjE0ZTIwMzI0NGE5YzRmZTc5MWQ5MGQiLCJpYXQiOjE3MTQxMDUxODEsImV4cCI6MTcxNDcwOTk4MX0.2H6sRfraAhWvjE74348AVQwykuTQwfjIK5tJlL1-U28",
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
