"use client"
import { useEffect, useState } from 'react'
import Assessment from "@/components/assessment"
import HeaderFilme from "@/components/headerfilme"
import Footer from "@/components/layouts/footer"
import Header from "@/components/layouts/header"
import GeneroTag from '@/components/genero_tag'
import * as Filmes from "@/lib/server_side_props/filmes"
import * as Genero from "@/lib/server_side_props/generos"

export default function Filme({ params }) {
    const [filme, setFilme] = useState(null)
    const [generos, setGeneros] = useState([])

    useEffect(() => {
        Filmes.get(params.id)
            .then(res =>{
                console.log(res)
                res.success && setFilme(res.body)
            })
            .catch(e => console.error(e))
        Genero.getAll()
            .then(res =>{
                console.log(res)
                res.success && setGeneros(res.body)
            })
            .catch(e => console.error(e))
    }, [params.id])
    
    return (
        <>
            <Header small={true} />
            <div className="container p-10 mx-auto bg-green-100 shadow-lg rounded-b-xl">
                <main className="flex flex-col gap-4 md:flex-row">
                    <div className="w-[300px] md:w-[200px] lg:m-0 m-auto h-[22.5rem] bg-red-50 flex items-center overflow-hidden justify-center rounded-lg">
                        <img src={filme?.poster} alt={filme?.name} className="object-cover object-center w-auto h-full" />
                    </div>
                    <div className="flex flex-col flex-1 w-full p-4 rounded-lg md:w-1/2 bg-green-50">
                        <HeaderFilme filme={filme} generos={generos} setFilme={setFilme}> 
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
                                <span className="">Data de Lançamento:</span> {new Date(filme?.released).toLocaleDateString()}
                            </li>
                            <li>
                                <span className="">Duração:</span> {filme?.runtime} min
                            </li>
                            <li>
                                <span className="">Idioma:</span> {filme?.language}
                            </li>
                            <li className="flex flex-wrap gap-2 mt-1">
                                {filme?.generos?.map((g, i) => (
                                    <GeneroTag 
                                        key={i} 
                                        genero={g} 
                                        className={"bg-gray-400"}
                                    />
                                ))}  
                            </li>
                            <li className="font-bold">
                                Sinopse:
                            </li>
                        </ul>
                        <div className='flex-1 p-2 bg-gray-100'>
                            {filme?.plot}
                        </div>
                    </div>
                </main>
                <div className="py-10">
                    <p className="whitespace-pre-wrap">{filme?.descricao}</p>
                    <ul className="mt-4 text-sm">
                        
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    )
}


