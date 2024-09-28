"use server";

import { api_filmes } from '../api';

export async function create(filme) {
return await api_filmes.post("/", filme)
    .then(res => {
        if (res.status >= 200 && res.status < 300) return { success: true, body: res.data };
        throw new Error("Ocorreu um erro ao criar o filme.")
    })
    .then(res => {
        return { success: true, body: res }
    })

    .catch(e => {
        console.error(e.message)
        return { success: false, message: "Ocorreu um erro ao criar o filme." }
    })
}
