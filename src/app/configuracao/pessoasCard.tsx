'use client'

import { useEffect, useState } from "react"
import { fetchPessoas, criarPessoa, deletarPessoa, editarPessoa } from "@/app/services/pessoaService"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Pencil, Trash, Check } from 'lucide-react'

export default function PessoasCard() {
    const [pessoas, setPessoas] = useState<{ id: number; nome: string }[]>([])
    const [novaPessoa, setNovaPessoa] = useState("")

    useEffect(() => {
        carregarPessoas();
    }, [])

    async function carregarPessoas() {
        try{
            const data = await fetchPessoas();
            setPessoas([...data]);
        } catch(erro){
            console.error("Erro ao carregar pessoas:", erro);
        }
    } 

    async function handleCriar(){
        if(!novaPessoa.trim()) return;

        try{
            await criarPessoa(novaPessoa);
            setNovaPessoa("");
            await carregarPessoas();
        } catch (erro) {
            console.error(erro);
        }
    }
    
    async function handleDelete(id: number){
        try{
            await deletarPessoa(id);
            await carregarPessoas();
        } catch (erro){
            console.error(erro);
        }
    }

    return (
        <div className="w-[95%] min-h-96 bg-amber-50">
            <Card className="w-[50%] min-h-96 p-4 mx-auto mt-30">
                <CardTitle className="text-3xl justify-center flex">PESSOAS</CardTitle>
                <CardContent>
                    <ul>
                        {pessoas.map((pessoa)=> (
                            <li key={pessoa.id}>
                                <Button variant="ghost">
                                    <Pencil className="text-blue-500"/>
                                </Button>
                                <Button 
                                variant="ghost"
                                onClick={() => handleDelete(pessoa.id)}
                                >
                                    <Trash className="text-red-500"/>
                                </Button>
                                {pessoa.nome}
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter className="gap-2">
                <Input
                    placeholder="Digite o nome da Pessoa"
                    onChange={(e) => setNovaPessoa(e.target.value)}
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