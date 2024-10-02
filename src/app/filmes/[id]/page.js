"use client"
import { useEffect, useState } from 'react'
import Assessment from "@/components/assessment"
import HeaderFilme from "@/components/headerfilme"
import Footer from "@/components/layouts/footer"
import Header from "@/components/layouts/header"
import * as Filmes from "@/lib/server_side_props/filmes"
import GeneroTag from '@/components/genero_tag'


export default function Filme({ params }) {
    const [filme, setFilme] = useState(null)

    useEffect(() => {
        Filmes.get(params.id)
            .then(res =>{
                console.log(res)
                res.success && setFilme(res.body)
            })
            .catch(e => console.error(e))
    }, [params.id])
    
    return (
        <>
            <Header small={true} />
            <div className="container p-10 mx-auto bg-green-100 shadow-lg rounded-b-xl">
                <main className="flex flex-col gap-4 md:flex-row">
                    <div className="w-[300px] md:w-[200px] lg:m-0 m-auto h-[22.5rem] bg-red-50 flex items-center overflow-hidden justify-center rounded-lg">
                        <img src={filme?.imagem} alt={filme?.name} className="object-cover object-center w-auto h-full" />
                    </div>
                    <div className="flex-1 w-full p-4 rounded-lg md:w-1/2 bg-green-50">
                        <HeaderFilme fileId={params.id}> 
                            <span className="text-3xl font-bold">{filme?.title}</span>
                        </HeaderFilme>      
                        <ul className="mt-1 textext-sm">
                            <li>
                                <span className="flex items-center gap-1 font-bold">
                                    {(filme?.ratings*5)/100} 
                                    <div>
                                        <Assessment current={filme?.ratings} total={100} />
                                    </div>
                                </span> 
                            </li>
                            <li>
                                <span className="font-bold">Data de Lançamento:</span> {filme?.data_lancamento}
                            </li>
                            <li className="flex flex-wrap gap-2">
                                gêneros: {filme?.generos?.map((g, i) => (
                                    <GeneroTag 
                                        key={i} 
                                        genero={g} 
                                        className={"bg-gray-400"}
                                    />
                                ))}  
                            </li>
                        </ul>
                    </div>
                </main>
                <div className="py-10">
                    <p className="whitespace-pre-wrap">{filme?.descricao}</p>
                    <ul className="mt-4 text-sm">
                        <li>
                            <span className="font-bold">Duração:</span> {filme?.runtime} min
                        </li>
                        <li>
                            <span className="font-bold">Idiomas:</span> {filme?.language}
                        </li>
                        <li>
                            <span className="font-bold">Sinopse:</span> {filme?.plot}
                        </li>
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    )
}


