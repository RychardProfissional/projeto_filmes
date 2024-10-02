'use client'

import { useState } from "react"
import Form from "./common/form"
import * as Yup from 'yup'
import * as Filmes from "@/lib/server_side_props/filmes"
import { useUser } from "./context"
import { INPUT } from "@/lib/constants/forms"
import { useRouter } from "next/router"

export default function HeaderFilme({fileId, children}) {
    const [formOpen, setFormOpen] = useState(false)
    const [genre, setGenre] = useState('')
    const router = useRouter()
    const user = useUser()
    const isAdmin = user?.roles?.includes('development')
    
    const handleFormSubmit = async (data) => {
    }

    const handleDel = async () => {
        Filmes.del(fileId).then((res) => {
            if (res.success) {
                router.push('/')
            }
        })
    }
    
    const form = {
        title: "Editar o filme",
        onSubmit: handleFormSubmit,
        isModal: true,
        inputs: [
            {
                label: "Nome",
                name: "name",
                defaultValue: '',
                validation: Yup.string().required('O nome não pode estar vazio'),
                type: INPUT.TEXT,
            },
            {
                label: "Imagem",
                name: "imagem",
                defaultValue: '',
                validation: Yup.string().url('O link da imagem deve ser válido').required('O link da imagem é obrigatório'),
                type: INPUT.TEXT,
            },
            {
                label: "Link",
                name: "link",
                defaultValue: '',
                validation: Yup.string().url('O link do filme deve ser válido').required('O link do filme é obrigatorio'),
                type: INPUT.TEXT,
            },
            {
                label: "Categorias",
                name: "categorias",
                defaultValue: '',
                type: INPUT.SELECT,
                options: [
                    { label: "Acão", value: "acao" },
                    { label: "Aventura", value: "aventura" },
                    { label: "Comedia", value: "comedia" },
                    { label: "Drama", value: "drama" },
                    { label: "Ficção", value: "ficcao" },
                ],
            },
            {
                label: "Género",
                name: "generos",
                defaultValue: '',
                type: INPUT.SELECT,
                options: [
                    { label: "A o", value: "acao" },
                    { label: "Aventura", value: "aventura" },
                    { label: "Comedia", value: "comedia" },
                    { label: "Drama", value: "drama" },
                    { label: "Fic o", value: "ficcao" },
                ],
            },
            {
                label: "Classifica o",
                name: "classificacao",
                defaultValue: '',
                type: INPUT.SELECT,
                options: [
                    { label: "L", value: "L" },
                    { label: "10", value: "10" },
                    { label: "12", value: "12" },
                    { label: "14", value: "14" },
                    { label: "16", value: "16" },
                ],
            },
            {
                label: "Sinopse",
                name: "sinopse",
                defaultValue: '',
                type: INPUT.TEXTAREA,
            },
            {
                label: "Descri o",
                name: "descricao",
                defaultValue: '',
                type: INPUT.TEXTAREA,
            },
        ],
    };

    return isAdmin ? (
        <>
            <div className="flex justify-between">
                {children}
                <button
                    onClick={() => setFormOpen(true)}
                >
                    Editar
                </button>
                <button
                    onClick={() => handleDel()}
                >
                    Remover
                </button>
            </div>
            <Form {...form} open={formOpen} onClose={() => setFormOpen(false)} />
        </>
    ) : (
        <div className="flex justify-between">
            {children}
        </div>
    )
}

