'use client'

import { useRouter } from "next/navigation";
  
export const Card = ({
    imdbID,
    title = '', 
    plot,
    released,
    poster,
    categorias,
    runtime,
    genres,
    language = [],
    rated = "",
    ratings,
  }) => {
    const route = useRouter()
    return (
      <div 
        className="flex flex-col cursor-pointer overflow-hidden font-normal rounded-lg shadow-lg min-w-[27vw] relative group hover:scale-[1.03] transition-all"
        onClick={() => route.push(`/filmes/${imdbID}`)}
      >
        <img className="h-[200px] transition-all w-full object-cover" src={poster} alt={title} />
        <div className="flex flex-col gap-2 p-4">
          <div className="flex gap-2 align-middle">
            {rated && <ClassificacaoIndicativa classificacao={rated}/>}
            <p className="overflow-hidden text-sm max-h-10 line-clamp-2">{plot}</p>
          </div>
          <span className="text-sm">{released}</span>
          <div className="flex flex-wrap gap-2">
            {categorias?.map((c, i) => <span key={`categoria-${i}`} className="px-2 text-sm bg-gray-200 rounded-full">{c}</span>)}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">{runtime} min</span>
            <span className="text-sm">{genres?.map((g, i) => <span key={`genero-${i}`}>{g}</span>)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {language}
            </span>
            <span className="text-sm">{ratings}/5</span>
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
   