import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import { Cards } from "@/components/cards";
import Hero from "@/components/hero";
import { api } from "@/lib/api";
import BackToTop from "@/components/layouts/back_to_top";

export default async function Home() {
  let user = await api.get("auth/user").catch(error => {
    return { roles: [] }
  })
  user.roles = ["development"]
  return (
    <div>
      <Header />
      <Hero />
      {CardsFilters.map((f, i) => (
        <Cards key={`filter-${i}`} {...f} roles={user.roles}/>
      ))}
      <BackToTop />
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
    title: "Avaliados pela critica"
  },
  {
    filter: "classificados",
    title: "Mais bem classificados"
  }
]
