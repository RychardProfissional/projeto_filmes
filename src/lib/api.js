"use server";

import axios from "axios";

function CreateAxiosInstance(path = "") {
    const instance = axios.create({
        baseURL: `${process.env.NEXT_FILMES_API_URL}/${path ? `${path}/` : ""}`,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return instance;
}

export var api = CreateAxiosInstance()
export var api_filmes = CreateAxiosInstance('filmes')
export var api_generos = CreateAxiosInstance('generos')
