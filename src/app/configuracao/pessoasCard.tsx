'use client'

import { useEffect, useState } from "react"
//import { fetchPessoas } from "@/app/services/pessoaService"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Pencil, Trash, Check } from 'lucide-react'

export default function PessoasCard() {
    const [pessoas, setPessoas] = useState<any[]>([])


    return (
        <div className=" w-[95%] min-h-96 bg-amber-950">
            <Card className=" w-[50%] min-h-96 p-4 mx-auto mt-30">
                <CardTitle className="text-3xl justify-center flex">PESSOAS</CardTitle>
                <CardContent>
                    <ul>
                        {pessoas.map((pessoa: any) => (
                        <li key={pessoa.id}>
                            <div className="flex">
                                <Button 
                                    variant="ghost"
                                    //onClick={() => {
                                    //    setEditandoId(categoria.id); //Aqui define qeum está sendo editado
                                    //    setNomeEditado(categoria.nome) //Preenche o input de edição com o nome atual da categoria
                                    //}}
                                >
                                    <Pencil className=" text-blue-500" />
                                </Button>
                                <Button 
                                    variant="ghost"
                                    //onClick={() => handleDelete(categoria.id)}
                                >
                                    <Trash className="text-red-500" />
                                </Button>
                                
                            </div>
                        </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter className="gap-2">
                <Input
                    placeholder="Digite a Pessoa"
                    //value={novaCategoria}
                    //onChange={(e) => setNovaCategoria(e.target.value)}
                />
                <Button
                    variant="secondary"
                    className="bg-[#12698A]"
                    //onClick={() => handleCriar()}
                >
                    Enviar
                </Button>
                </CardFooter>
            </Card>
        </div>
    )
}