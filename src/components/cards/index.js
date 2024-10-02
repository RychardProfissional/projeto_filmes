"use client"
import * as Filmes from "@/lib/server_side_props/filmes";
import { Card } from "./card";
import { useEffect, useState } from "react";


export const CardsFilter = ({filter, title=""}) => {
    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        Filmes.getAllByFilters(filter, 5)
          .then(f => {
            if (f.success) {
              setFilmes(typeof f.body === "object" ? f.body : [])
            }
          })
    }, [])
    
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

export const Cards = ({title = "", ...props}) => {
  const [filmes, setFilmes] = useState([])
    
  useEffect(() => {
    Filmes.getAll(5)
      .then(f => {
        if (f.success) {
          setFilmes(typeof f.body === "object" ? f.body : [])
        }
      })
  }, [])
  
  return (
    <div className="grid max-w-full grid-cols-1 gap-4 overflow-x-auto">
      <div className="pl-10 text-2xl font-bold">{title}</div>
      <div className="flex gap-4 py-3 pl-10 flex-nowrap lg:flex-nowrap lg:overflow-x-auto lg:scroll-smooth">  
        {console.log(filmes)}
        {filmes.map((f, i) => (
          <Card key={`card-${i}`} {...f} />
        ))}
      </div>
    </div>
  );
}