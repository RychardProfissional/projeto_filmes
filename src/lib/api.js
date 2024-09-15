import axios from "axios";

function CreateAxiosInstance(path = "") {
    const instance = axios.create({
        baseURL: `${process.env.NEXT_FILMES_API_URL}/${path ? `${path}/` : ""}`,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_TMDB_API_KEY
        }
    })
    return instance;
}

export var api = CreateAxiosInstance()