export const request = async ({
    url,
    method,
    body,
    headers = {},
}) => {
    const apiUrl = `http://localhost:5000/api/v1/${url}`
    const fetchBody = {
        method,
        headers
    }

    if (body) {
        fetchBody.body = body
    }

    const response = await fetch(apiUrl, fetchBody)
    return response.json()
}

export const requestWithToken = async ({
    url, 
    method, 
    token, 
    clientId, 
    body
}) => {
    const apiUrl = `http://localhost:5000/api/v1/${url}`
    const fetchBody = {
        headers: {
            'x-client-id': clientId,
            Authorization: `Bearer ${token}`
        },
        method,
    }

    if (body) {
        fetchBody.body = body
    }

    const response = await fetch(apiUrl, fetchBody)
    return response.json()
}
