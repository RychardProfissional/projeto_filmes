import Assessment from "@/components/assessment"
import HeaderFilme from "@/components/headerfilme"
import Footer from "@/components/layouts/footer"
import Header from "@/components/layouts/header"
import { api } from "@/lib/api"

export default async function Filme({ params }) {
    const filme = await api.get(`filmes/${params.id}`)
        .then(res => res.data)
        .catch(e => {
            console.error(e)
            return null
        })

    return (
        <>
            <Header small={true} />
            <div className="container p-10 mx-auto bg-green-100 shadow-lg rounded-b-xl">
                <main className="flex flex-col gap-4 md:flex-row">
                    <div className="w-[300px] md:w-[200px] lg:m-0 m-auto h-[22.5rem] bg-red-50 flex items-center overflow-hidden justify-center rounded-lg">
                        <img src={filme.imagem} alt={filme.name} className="object-cover object-center w-auto h-full" />
                    </div>
                    <div className="flex-1 w-full p-4 rounded-lg md:w-1/2 bg-green-50">
                        <HeaderFilme> 
                            <span className="text-3xl font-bold">{filme.name}</span>
                        </HeaderFilme>      
                        <ul className="mt-1 textext-sm">
                            <li>
                                <span className="flex items-center gap-1 font-bold">
                                    {filme.avaliacao} 
                                    <div>
                                        <Assessment current={filme.avaliacao} total={5} />
                                    </div>
                                </span> 
                            </li>
                            <li>
                                <span className="font-bold">Data de Lançamento:</span> {filme.data_lancamento}
                            </li>
                            <li>
                                <span className="font-bold">Gêneros:</span> {filme.generos.join(', ')}
                            </li>
                            <li>
                                <span className="font-bold">Classificação:</span> {filme.classificacao}
                            </li>
                        </ul>
                    </div>
                </main>
                <div className="py-10">
                    <p className="whitespace-pre-wrap">{filme.descricao}</p>
                    <ul className="mt-4 text-sm">
                        <li>
                            <span className="font-bold">Data de Lançamento no Site:</span> {filme.data_lancamento_site}
                        </li>
                        <li>
                            <span className="font-bold">Categorias:</span> {filme.categorias.join(', ')}
                        </li>
                        <li>
                            <span className="font-bold">Duração:</span> {filme.duracao} min
                        </li>
                        <li>
                            <span className="font-bold">Idiomas:</span> {filme.idiomas.join(', ')}
                        </li>
                        <li>
                            <span className="font-bold">Sinopse:</span> {filme.sinopse}
                        </li>
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    )
}


