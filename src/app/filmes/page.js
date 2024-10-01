'use client'
import { Cards } from "@/components/cards";
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
        {CardsFilters.map((f, i) => (
          <Cards key={`filter-${i}`} {...f} />
        ))}
      </div>
      <Footer/>
    </>
  );
}

const CardsFilters = [
  {
    filter: {
      field: "createdAt",
      operation: "gte",
      value: new Date(new Date() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      quantity: 15
    },
    title: "Novidades"
  },
  {
    filter: { 
      field: "ratings",
      operation: "gte",
      value: 8,
      quantity: 15
    },
    title: "Aclamados pela crítica"
  },
  {
    filter: {
      field: "genre",
      operation: "eq",
      value: { name: "Comedy" },
      quantity: 15
    },
    title: "Comédia"
  },
];
