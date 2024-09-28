import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import { Cards } from "@/components/cards";
import Hero from "@/components/hero";

export default async function Home() {
  return (
    <div>
      <Header />
      <Hero title="Fimes Online" />
      <div className="grid max-w-full grid-cols-1 gap-4 my-3 overflow-x-auto">
        {CardsFilters.map((f, i) => (
          <Cards key={`filter-${i}`} {...f} />
        ))}
      </div>
      <Footer/>
    </div>
  );
}

const CardsFilters = [
  {
    filter: "recentes",
    title: "Novidades"
  },
  {
    filter: "populares",
    title: "Mais populares"
  },
  {
    filter: "avaliados",
    title: "Aclamados pela critica"
  },
  {
    filter: "classificados",
    title: "Mais bem classificados"
  }
]
