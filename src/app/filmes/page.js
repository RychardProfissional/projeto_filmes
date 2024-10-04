'use client'
import { Cards, CardsFilter } from "@/components/cards";
import Hero from "@/components/hero";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import Link from "next/link";

export default function Filmes() {
  return (
    <>
      <Header />
      <Hero title="Gerenciador dos filmes" />
      <div className=" bg-blue-100">
        <div className="flex justify-center">
          <Link 
            href="/filmes/register" 
            className="px-10 py-2 font-bold text-white bg-red-500 rounded-b-full hover:bg-blue-700"
          >
            Adicionar um novo filme
          </Link>
        </div>
        <div className="grid max-w-full grid-cols-1 gap-4 my-3 overflow-x-auto">
          <Cards title={"teste"} />
        </div>
      </div>
      <Footer/>
    </>
  );
}
