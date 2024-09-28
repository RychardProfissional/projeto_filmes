import { Cards } from "@/components/cards";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";

export default function Filmes() {
  return (
    <>
      <Header small={true}/>
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
