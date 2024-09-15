import { api } from "@/lib/api";
import { FaFilm } from 'react-icons/fa';
function IconeLivre() {
  return <FaHeart />;
}


export const Cards = async ({filter, title="", roles}) => {
    const filmes = await api.get(`filmes${filter ? `?filter=${filter}` : ""}`)
      .then(response => {
        return response.data
      })
      .catch(e => {
        console.error(e)
        return null
      })
      
    if (filmes === null) return 
      
    return (
      <div className="grid max-w-full grid-cols-1 gap-4 ml-10 overflow-x-auto">
        <div>{title}</div>
        <div className="flex gap-4 flex-nowrap lg:flex-nowrap lg:overflow-x-auto lg:scroll-smooth">
          {filmes.map((f, i) => (
            <Card key={`card-${i}`} {...f} editor={roles.includes("admin") || roles.includes("development")}/>
          ))}
        </div>
      </div>
    );
  }
  
export const Card = ({
    name, 
    descricao,
    data_lancamento,
    data_lancamento_site,
    imagem,
    link,
    categorias,
    duracao,
    generos,
    idiomas = [],
    avaliacao,
    classificacao,
    sinopse,
    editor
  }) => {
    return (
      <div className="flex flex-col overflow-hidden rounded-lg shadow-lg min-w-[27vw] relative">
        <h2 className="absolute text-lg font-bold top-2 left-2 max-w-[70%]" style={{maxWidth: '70%'}}>{name}</h2>
        {editor && (
          <div className="absolute top-2 right-2">
            <a href={`/filmes/${name}/editar`} className="text-sm underline">Editar</a>
          </div>
        )}
        <img className="h-[200px] w-full object-cover" src={imagem} alt={name} />
        <div className="flex flex-col gap-2 p-4">
          <div className="flex gap-2 align-middle">
            {classificacao && <ClassificacaoIndicativa classificacao={classificacao}/>}
            <p className="overflow-hidden text-sm max-h-10 text-ellipsis" style={{WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical'}}>{descricao}</p>
          </div>
          <span className="text-sm">{data_lancamento}</span>
          <a className="text-sm underline" href={link}>Ver mais</a>
          <div className="flex flex-wrap gap-2">
            {categorias?.map((c, i) => <span key={`categoria-${i}`} className="px-2 text-sm bg-gray-200 rounded-full">{c}</span>)}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">{duracao} min</span>
            <span className="text-sm">{generos?.map((g, i) => <span key={`genero-${i}`}>{g}</span>)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">{idiomas?.map((id, i) => <span key={`idioma-${i}`}>{id}</span>)}</span>
            <span className="text-sm">{avaliacao}/5</span>
          </div>
          
        </div>
      </div>
    )
  }
  function ClassificacaoIndicativa({ classificacao }) {
    const color = classificacao === 'L' ? 'bg-green-500' : classificacao === '18' ? 'bg-red-500' : 'bg-orange-500';
    return (
      <div 
        className={`min-w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-xl ${color}`}
      >
        {classificacao}
      </div>
    );
  }
