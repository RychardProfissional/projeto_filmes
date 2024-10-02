import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import { CardsFilter } from "@/components/cards";
import Hero from "@/components/hero";

export default async function Home() {
  return (
    <div>
      <Header />
      <Hero title="Fimes Online" />
      <div className="grid max-w-full grid-cols-1 gap-4 my-3 overflow-x-auto">
        {CardsFilters.map((f, i) => (
          <CardsFilter key={`filter-${i}`} {...f} />
        ))}
      </div>
      <Footer/>
    </div>
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
