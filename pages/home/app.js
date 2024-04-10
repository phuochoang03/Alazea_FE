import { request, requestWithToken } from "../../utils/useRequestHelper.js";

// Cái này lúc login sẽ lấy được token
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjE0ZTIwMzI0NGE5YzRmZTc5MWQ5MGQiLCJlbWFpbCI6IkhvYW5nQGdtYWlsLmNvbSIsImlhdCI6MTcxMjY3MTEzNSwiZXhwIjoxNzEzMjc1OTM1fQ.N-FMO-TNNhH9IJiIcFyC6WjjE4RMhlWNWAHWtJgjCjg"

// Cách dùng để gọi api
const test = async () => {
    console.log(
        await requestWithToken({
            url: 'auth/check-login',
            method: "GET", 
            token,
            clientId: "6614e203244a9c4fe791d90d1" // Lúc login sẽ lấy được
        })
    );
}

test()