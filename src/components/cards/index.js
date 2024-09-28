import { api } from "@/lib/api";
import { Card } from "./card";

export const Cards = async ({filter, title=""}) => {
    const filmes = await api.get(`/filmes`)
      .then(response => {
        console.log(response.data)
        return response.data
      })
      .catch(e => {
        console.error(e)
        return null
      })
      
    if (filmes === null) return 
    
    return (
      <div className="grid max-w-full grid-cols-1 gap-4 overflow-x-auto">
        <div className="pl-10 text-2xl font-bold">{title}</div>
        <div className="flex gap-4 py-3 pl-10 flex-nowrap lg:flex-nowrap lg:overflow-x-auto lg:scroll-smooth">  
          {filmes.map((f, i) => (
            <Card key={`card-${i}`} {...f} />
          ))}
        </div>
      </div>
    );
  }
