"use server";

import { api_filmes } from '../api';
import { buildQueryParamsByFilters } from '../util/url';

export async function create(filme) {
  return await api_filmes.post("/", filme)
    .then(res => {
        if (res.status >= 200 && res.status < 300) return { success: true, body: res.data };
        throw new Error("Ocorreu um erro ao criar o filme.")
    })
    .catch(e => {
        console.error(e.message)
        return { success: false, message: "Ocorreu um erro ao criar o filme." }
    })
}

export async function get(id) {
    return await api_filmes.get(`/${id}`)
      .then(res => {
        if (res.status >= 200 && res.status < 300) return { success: true, body: res.data };
        throw new Error("Ocorreu um erro ao buscar o filme.")
      })
      .catch(e => {
        console.error(e.message)
        return { success: false, message: "Ocorreu um erro ao buscar o filme." }
      })  
  }

export async function getAll() {
  return await api_filmes.get("/")
    .then(res => {
        if (res.status >= 200 && res.status < 300) return { success: true, body: res.data };
        throw new Error("Ocorreu um erro ao buscar os filmes.")
    })
    .catch(e => {
        console.error(e.message)
        return { success: false, message: "Ocorreu um erro ao buscar os filmes." }
    })
}

export async function getAllByFilters(filters, quantity = 5) {
    const queryParams = buildQueryParamsByFilters(filters, quantity);
    console.log(queryParams)
    return await api_filmes.get(`/filter${queryParams}`)
        .then(res => {
            if (res.status >= 200 && res.status < 300) return { success: true, body: res.data };
            throw new Error("Ocorreu um erro ao buscar os filmes.")
        })
        .catch(e => {
            console.error(e.message)
            return { success: false, message: "Ocorreu um erro ao buscar os filmes." }
        })
}

export async function update(id, filme) {
    return await api_filmes.put(`/${id}`, filme)
        .then(res => {
            if (res.status >= 200 && res.status < 300) return { success: true, body: res.data };
            throw new Error("Ocorreu um erro ao atualizar o filme.")
        })
        .catch(e => {
            console.error(e.message)
            return { success: false, message: "Ocorreu um erro ao atualizar o filme." }
        })
}  

export async function del(id) {
    return await api_filmes.delete(`/${id}`)
        .then(res => {
            if (res.status >= 200 && res.status < 300) return { success: true, body: res.data };
            throw new Error("Ocorreu um erro ao deletar o filme.")
        })
        .catch(e => {
            console.error(e.message)
            return { success: false, message: "Ocorreu um erro ao deletar o filme." }
        })
}
