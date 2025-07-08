'use client'

import { useEffect, useState } from "react"
import { criarCategoria, deleteCategoria, editarCategoria, fetchCategorias } from "@/app/services/categoriaService"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Pencil, Trash, Check } from 'lucide-react'

export default function CategoriaCard() {
    const [categorias, setCategorias] = useState<any[]>([])
    const [novaCategoria, setNovaCategoria] = useState("")
    const [editandoId, setEditandoId] = useState<number | null>(null); //guarda o ID da categoria que está sendo editada
    const [nomeEditado, setNomeEditado] = useState("");

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    try {
      const data = await fetchCategorias();
      setCategorias(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleCriar = async () => {
    if (!novaCategoria.trim()) return;

    try {
      await criarCategoria(novaCategoria);
      setNovaCategoria("");
      carregarCategorias();
    } catch (erro) {
      console.error(erro);
    }
  }

  const handleDelete = async (id: number) => {
    try{
        await deleteCategoria(id);
        carregarCategorias();
    } catch (erro) {
      console.error(erro);
    }
  }

  const handleEditar = async (id: number) => {
  try {
    await editarCategoria(id, nomeEditado);
    setEditandoId(null);
    setNomeEditado("");
    carregarCategorias();
  } catch (erro) {
    console.error(erro);
  }
};


    return(
        <div className=" w-[95%] min-h-96 bg-amber-50">
            <Card className=" w-[50%] min-h-96 p-4 mx-auto mt-30">
                <CardTitle className="text-3xl justify-center flex">CATEGORIAS</CardTitle>
                <CardContent>
                    <ul>
                        {categorias.map((categoria: any) => (
                        <li key={categoria.id}>
                            <div className="flex">
                                <Button 
                                    variant="ghost"
                                    onClick={() => {
                                        setEditandoId(categoria.id); //Aqui define qeum está sendo editado
                                        setNomeEditado(categoria.nome) //Preenche o input de edição com o nome atual da categoria
                                    }}
                                >
                                    <Pencil className=" text-blue-500" />
                                </Button>
                                <Button 
                                    variant="ghost"
                                    onClick={() => handleDelete(categoria.id)}
                                >
                                    <Trash className="text-red-500" />
                                </Button>
                                {editandoId === categoria.id ? (
                                <>
                                    <Input
                                    value={nomeEditado}
                                    onChange={(e) => setNomeEditado(e.target.value)}
                                    className="max-w-xs"
                                    />
                                    <Button
                                    variant="ghost"
                                    onClick={() => handleEditar(categoria.id)}
                                    >
                                    <Check className="size-[19px] text-green-600" />
                                    </Button>
                                </>
                                ) : (
                                <p className="p-1 mt-1">{categoria.nome}</p>
                                )}
                            </div>
                        </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter className="gap-2">
                <Input
                    placeholder="Digite sua Categoria"
                    value={novaCategoria}
                    onChange={(e) => setNovaCategoria(e.target.value)}
                />
                <Button
                    variant="secondary"
                    className="bg-[#12698A]"
                    onClick={() => handleCriar()}
                >
                    Enviar
                </Button>
                </CardFooter>
            </Card>
        </div>
    )
}