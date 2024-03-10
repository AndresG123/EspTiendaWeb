const backendUrl = "http://127.0.0.1:8000/";


export const getItems=async (endpoint)=>{
    let res=await fetch(`${backendUrl}${endpoint}/`)
    return await res.json()
}