'use client'

import { useState } from "react"
import Form from "./common/form"
import * as Yup from 'yup'
import * as Filmes from "@/lib/server_side_props/filmes"
import { useUser } from "./context"
import { INPUT } from "@/lib/constants/forms"
import { useRouter } from "next/navigation"

export default function HeaderFilme({filme, generos, children}) {
    const [formOpen, setFormOpen] = useState(false)
    const router = useRouter()
    const user = useUser()
    
    const isAdmin = user?.roles?.includes('development')
    
    const handleFormSubmit = async (data) => {
        console.log(data)
    }

    const handleDel = async () => {
        const confirm = window.confirm('Você realmente deseja deletar o filme?')
        if (confirm) {
            Filmes.del(filme?.id).then((res) => {
                if (res.success) {
                    router.push('/')
                }
            })
        }
    }
    
    const form = {
        title: "Editar o filme",
        onSubmit: handleFormSubmit,
        isModal: true,
        inputs: [
            {
                label: "Titulo",
                name: "title",
                defaultValue: filme?.title,
                validation: Yup.string().required('O nome não pode estar vazio'),
                type: INPUT.TEXT,
            },
            {
                label: "Imagem",
                name: "poster",
                defaultValue: filme?.poster,
                validation: Yup.string().required('O link da imagem é obrigatório'),
                type: INPUT.TEXT,
            },
            {
                label: "Duração",
                name: "runtime",
                defaultValue: filme?.runtime,
                type: INPUT.NUMBER,
                validation: Yup.number().min(1, 'A duração deve ser pelo menos 1 minuto').required('A duração é obrigatória'),  
            },
            {
                label: "Idioma",
                name: "language",
                defaultValue: filme?.language,
                type: INPUT.TEXT,
                validation: Yup.string().required('O idioma é obrigatório'),
            },
            {
                label: "Data de lancamento",
                name: "released",
                defaultValue: filme?.released,
                type: INPUT.DATE,
                validation: Yup.date().required('A data de lancamento é obrigatória').nullable(),
            },
            {
                label: "Classificação",
                name: "rated",
                defaultValue: filme?.rated,
                type: INPUT.SELECT,
                options: [
                    { label: "L", value: "-1" },
                    { label: "10", value: "10" },
                    { label: "12", value: "12" },
                    { label: "14", value: "14" },
                    { label: "16", value: "16" },
                ],
            },
            {
                label: "Género",
                name: "generos",
                defaultValue: filme?.generos?.map((g) => g.id),
                type: INPUT.MULTISELECT,
                options: generos?.map((g) => ({ label: g.name, value: g.id })),
            },
            {
                label: "Sinopse",
                name: "plot",
                defaultValue: filme?.plot,
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

