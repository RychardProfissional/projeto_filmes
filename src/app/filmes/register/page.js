"use client";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import * as Yup from 'yup';
import * as Filmes from "@/lib/server_side_props/filmes";
import * as Genero from "@/lib/server_side_props/generos";
import { useEffect, useState } from "react";

const FilmeForm = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  
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
      genres: selectedGenres,
    };

    try {
      await validationSchema.validate(filme, { abortEarly: false });
      
      const created = await Filmes.create(filme);
      alert("Filme criado com sucesso!");
    } catch (error) {
      if (error.inner) {
        error.inner.forEach(err => {
          console.error(err.message);
          alert(err.message);
        });
      } else {
        console.error("Erro ao criar filme:", error);
        alert("Ocorreu um erro ao criar o filme.");
      }
    }
  };

  const handleGenreChange = (id) => {
    if (selectedGenres.includes(id)) {
      setSelectedGenres((prev) => prev.filter((prev_id) => prev_id !== id));
    } else {
      setSelectedGenres((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    Genero.getAll()
      .then(f => {
        if (f.success) {
          setGenres(typeof f.body === "object" ? f.body : [])
        }
      })
  }, [])

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
              />
            </div>
            <input
              className="p-2 border rounded-lg"
              type="text"
              name="poster"
              placeholder="Poster URL"
            />
            <div className="flex items-center mb-4">
              <label htmlFor="runtime" className="block w-24 font-medium">Duração: </label>
              <input
                type="number"
                id="runtime"
                name="runtime"
                min="1"
                className="flex-1 w-full px-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Insira a duração em minutos"
              />
            </div>
            <input
              className="p-2 border rounded-lg"
              type="number"
              name="ratings"
              placeholder="Classificações"
              min="0"
              step="0.1"
              max="10"
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
            <div className="max-h-[110px]">
              <label className="block mb-2 font-medium">Gêneros</label>
              <div className="w-full h-full p-2 overflow-y-auto border border-gray-300 rounded">
                {genres.map((genre) => (
                  <div
                    key={genre.id}
                    onClick={() => handleGenreChange(genre.id)}
                    className={`cursor-pointer block p-2 rounded transition-colors duration-200 
                      ${selectedGenres.includes(genre.id) ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-indigo-500 hover:text-white"}`}
                  >
                    <span className="block w-full truncate">{genre.name}</span>
                  </div>
                ))}
              </div>
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

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Título é obrigatório"),
  plot: Yup.string().required("Sinopse é obrigatória"),
  released: Yup.date().required("Data de lançamento é obrigatória").nullable(),
  // poster: Yup.string().url("A URL do poster deve ser válida").required("URL do poster é obrigatória"),
  runtime: Yup.number().min(1, "A duração deve ser pelo menos 1 minuto").required("Duração é obrigatória"),
  ratings: Yup.number().min(0, "A avaliação deve ser um número positivo").max(10, "A avaliação deve ser no máximo 10").required("Avaliação é obrigatória"),
  language: Yup.string().required("Idioma é obrigatório"),
  genres: Yup.array().min(1, "Pelo menos um gênero deve ser selecionado").required("Gêneros são obrigatórios"),
});

export default FilmeForm;
