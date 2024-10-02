"use server";

import { api_generos } from '../api';

export async function get(id) {
  return await api_generos.get(`/${id}`)
    .then(res => {
      if (res.status >= 200 && res.status < 300) return { success: true, body: res.data };
      throw new Error("Ocorreu um erro ao buscar o genero.")
    })
    .catch(e => {
      console.error(e.message)
      return { success: false, message: "Ocorreu um erro ao buscar o genero." }
    })  
}

export async function getAll() {
  return await api_generos.get("/")
    .then(res => {
        if (res.status >= 200 && res.status < 300) return { success: true, body: res.data };
        throw new Error("Ocorreu um erro ao buscar os generos.")
    })
    .catch(e => {
        console.error(e.message)
        return { success: false, message: "Ocorreu um erro ao buscar os generos." }
    })
}

export async function create(genero) {
    return await api_generos.post("/", genero)
        .then(res => {
            if (res.status >= 200 && res.status < 300) return { success: true, body: res.data };
            throw new Error("Ocorreu um erro ao criar o genero.")
        })
        .catch(e => {
            console.error(e.message)
            return { success: false, message: "Ocorreu um erro ao criar o genero." }
        })
}

export async function update(id, genero) {
    return await api_generos.put(`/${id}`, genero)
        .then(res => {
            if (res.status >= 200 && res.status < 300) return { success: true, body: res.data };
            throw new Error("Ocorreu um erro ao atualizar o genero.")
        })
        .catch(e => {
            console.error(e.message)
            return { success: false, message: "Ocorreu um erro ao atualizar o genero." }
        })
}

export async function del(id) {
    return await api_generos.delete(`/${id}`)
        .then(res => {
            if (res.status >= 200 && res.status < 300) return { success: true, body: res.data };
            throw new Error("Ocorreu um erro ao deletar o genero.")
        })
        .catch(e => {
            console.error(e.message)
            return { success: false, message: "Ocorreu um erro ao deletar o genero." }
        })
}