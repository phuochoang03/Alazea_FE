import { requestWithToken } from "./useRequestHelper.js";

export const checkAuth = async () => {
    try {
        const resRole = await requestWithToken({
            url: "auth/check-role",
            clientId: JSON.parse(localStorage.getItem("userInfo")).id,
            token: localStorage.getItem("accessToken"),
            method: "GET",
        })
        
        if(resRole.Error) {
            document.location = "/logn_in/login.html"
        } else {
            return resRole.data 
        }
    } catch (error) {
        document.location = "/logn_in/login.html"
    }
}
