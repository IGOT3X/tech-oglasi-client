import {DEBUG} from "../types";

let API_LINK = "https://tech-oglasi.com/api/";

if (DEBUG) API_LINK = "http://192.168.100.201:1313/api/"

export const SendPost = async(endpoint:string,toPost:{})=>{
    const response = await fetch(API_LINK+endpoint,{
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(toPost)
    });

    return response.json();
}

export const SendPostImage = async(endpoint:string,toPost:FormData) =>{
    const response = await fetch(API_LINK+endpoint,{
        method: 'POST',
        body: toPost,
        headers:{
            'Accept': 'application/json',
        },
    });

    return response.json();
}

export const SendGet = async(endpoint:string,params:{})=>{
    const response = await fetch(API_LINK+endpoint+'?'+new URLSearchParams(params));
    return response.json();
}