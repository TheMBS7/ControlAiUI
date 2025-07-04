import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pencil, Trash } from 'lucide-react'

async function fetchCategorias() {
  const res = await fetch('http://localhost:5189/api/Categorias/Display-Categorias', {
    cache: 'no-store' // para sempre buscar dados atualizados
  });
  if (!res.ok) {
    throw new Error('Falha ao carregar os extratos');
  }
  return res.json();
}

export default async function Configuracao(){

    const categorias = await fetchCategorias();

    return(
        <div className=" w-[50%] min-h-96 bg-amber-50">
            <Card className=" w-[50%] min-h-96 p-4 mx-auto mt-30">
                <CardTitle className="text-3xl justify-center flex">CATEGORIAS</CardTitle>
                <CardContent>
                    <ul>
                        {categorias.map((categoria: any) => (
                        <li key={categoria.id}>
                            <div className="flex">
                                <Button variant="ghost">
                                    <Pencil size={18} className="text-blue-500" />
                                </Button>
                                <Button variant="ghost">
                                    <Trash size={18} className="text-red-500" />
                                </Button>
                                <p className="p-1 mt-1">{categoria.nome}</p>
                            </div>
                        </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter className="gap-2">
                    <Input placeholder="Digite sua Categoria" className=""/>
                    <Button variant="secondary" className="bg-[#12698A]">Enviar</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

