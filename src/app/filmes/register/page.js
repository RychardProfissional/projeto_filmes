"use client";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import * as Filmes from "@/lib/server_side_props/filmes";

const FilmeForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const filme = {
      title: formData.get("title"),
      plot: formData.get("plot"),
      released: formData.get("released"),
      poster: formData.get("poster"),
      runtime: formData.get("runtime"),
      ratings: formData.get("ratings"),
      language: formData.get("language"),
      genres: formData.getAll("genres"),
    };

    try {
      const created = await Filmes.create(filme);
      console.log(created)
      alert("Filme criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar filme:", error);
      alert("Ocorreu um erro ao criar o filme.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header /> 
      <div className="container p-24 mx-auto">
        <h1 className="mb-4 text-3xl font-bold">Criar Novo Filme</h1>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded shadow-md">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              className="p-2 border rounded-lg"
              type="text"
              name="title"
              placeholder="Título"
              required
            />
            <input
              className="p-2 border rounded-lg"
              type="text"
              name="language"
              placeholder="Idioma"
            />
            <div className="flex items-center">
              <label htmlFor="released" className="block pr-10 font-medium">
                Data de Lançamento:
              </label>
              <input
                className="flex-1 p-1 border rounded-lg"
                type="date"
                name="released"
                id="released"
                required
              />
            </div>
            <input
              className="p-2 border rounded-lg"
              type="text"
              name="poster"
              placeholder="Poster URL"
            />
            <input
              className="p-2 border rounded-lg"
              type="text"
              name="runtime"
              placeholder="Duração"
            />
            <input
              className="p-2 border rounded-lg"
              type="text"
              name="ratings"
              placeholder="Classificações"
            />
            <div>
              <label htmlFor="plot" className="block mb-2 font-medium">
                Plot:
              </label>
              <textarea
                className="w-full p-2 border rounded-lg resize-none"
                name="plot"
                id="plot"
                placeholder="No filme..."
                rows={4}
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Gêneros</label>
              <select
                name="genres"
                multiple
                className="w-full p-2 border"
              >
              </select>
            </div>
          </div>
          <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
            Criar Filme
          </button>
        </form>
        <Footer />
      </div>
    </div>
  );
};

export default FilmeForm;
