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
      <Link 
        href="/filmes/register" 
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Novo filme
      </Link>
      <div className="grid max-w-full grid-cols-1 gap-4 my-3 overflow-x-auto">
        <Cards title={"teste"} />
      </div>
      <Footer/>
    </>
  );
}
