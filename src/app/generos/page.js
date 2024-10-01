"use client";
import { useState, useEffect } from "react";
import { AiTwotonePlusCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { InputBase } from "@/components/common/input/types";
import GeneroTag from "@/components/genero_tag";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import * as GenerosManager from "@/lib/server_side_props/generos";

export default function Generos() {
  const [generos, setGeneros] = useState([]);
  const [currentGenero, setCurrentGenero] = useState({});

  useEffect(() => {
    GenerosManager.getAll()
      .then((res) => {
        if (res.success) {
          setGeneros(res.body);
          setCurrentGenero(res.body[0] || {});
        }
      })
      .catch((e) => console.error(e.message));
  }, []);

  const handleAdd = () => setCurrentGenero({ id: null, name: "", description: "" });

  const handleDelete = (id) => {
    if (!id) return;
    GenerosManager.del(id)
    .then((res) => {
      if (res.success) {
          const newGeneros = generos.filter((genero) => genero.id !== id);
          setGeneros(newGeneros);
          setCurrentGenero(newGeneros[0] || {});
        }
      })
      .catch((e) => console.error(e.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentGenero.name) return;

    const saveGenero = currentGenero.id
      ? GenerosManager.update(currentGenero.id, currentGenero)
      : GenerosManager.create(currentGenero);

    saveGenero
      .then((res) => {
        if (res.success) {
          setGeneros((prevGeneros) =>
            !currentGenero.id
              ? [...prevGeneros, res.body]
              : prevGeneros.map((g) => (g.id === currentGenero.id ? res.body : g))
          );
          !currentGenero.id && handleAdd();
        }
      })
      .catch((e) => console.error(e.message));
  };

  return (
    <>
      <Header small={true} />
      <div className="container flex justify-center mx-auto h-[80vh] items-center">
        <main className="relative p-10 bg-gray-100 shadow-lg rounded-xl w-[50vw]">
          <div className="flex items-center justify-center h-52">
            <div className="flex items-center relief justify-center mb-28 bg-blue-100 rounded-full p-[100px]">
              <div className="flex items-center justify-center w-5 h-5">
                <h1 className="mt-5 mb-4 font-serif text-3xl font-bold text-center">Gêneros</h1>
              </div>
            </div>
          </div>
          
          {currentGenero.id && (
            <FaTrash
              onClick={() => handleDelete(currentGenero.id)}
              className="absolute w-6 h-6 text-red-500 transition-colors duration-200 cursor-pointer top-4 right-4 hover:text-red-700"
            />
          )}

          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-wrap flex-1 gap-4 overflow-y-auto max-h-[93px]">
              {generos.map((g, i) => (
                <GeneroTag
                  key={`genero-${i}`}
                  genero={g}
                  onClick={() => setCurrentGenero(g)}
                  className={`cursor-pointer transition-all duration-200 ${
                    currentGenero.id === g.id ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-200 text-gray-800"
                  } rounded-lg shadow-sm`}
                />
              ))}
            </div>
            <AiTwotonePlusCircle
              onClick={handleAdd}
              className="w-5 h-5 ml-4 text-blue-500 transition-colors duration-200 cursor-pointer hover:text-blue-700"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-5">
              <label className="flex-1 block">
                <span className="text-gray-700">Nome</span>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
                  value={currentGenero.name}
                  onChange={(e) => setCurrentGenero({ ...currentGenero, name: e.target.value })}
                />
              </label>
              <label className="flex-1 block">
                <span className="text-gray-700">Descrição</span>
                <input
                  type="text"
                  name="description"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
                  value={currentGenero.description}
                  onChange={(e) => setCurrentGenero({ ...currentGenero, description: e.target.value })}
                />
              </label>
            </div>
            <button
              type="submit"
              className="w-full p-2 text-white transition-all duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Salvar
            </button>
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
}
