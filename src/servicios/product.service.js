const backendUrl = "http://127.0.0.1:8000/";


export const getItems=async (endpoint)=>{
    let res=await fetch(`${backendUrl}${endpoint}/`)
    return await res.json()
}

export const updateItem=async (endpoint, data, id)=>{
    const response = await fetch(`${backendUrl}${endpoint}/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response.json()
}

export const postItem=async (endpoint, data)=>{
    const response = await fetch(`${backendUrl}${endpoint}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response.json()
}

export const getFilter=async (endpoint, filters)=>{
    const response = await fetch(`${backendUrl}${endpoint}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(filters)
    })

    return response.json()
}