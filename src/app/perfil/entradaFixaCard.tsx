'use client'

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { fetchEntradasFixas } from "../services/entradaFixaService";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Check, ChevronRight, ChevronLeft } from 'lucide-react'

export default function EntradaFixaCard(){
    const [entradasFixas, setEntradasFixas] = useState<{id: number; descricao:string; valor:number; dataReferencia:Date}[]>([])
    
    useEffect(() => {
        carregarEntradasFixas();
    },[])

    
    async function carregarEntradasFixas() {
        try{
            const data = await fetchEntradasFixas()
            setEntradasFixas(data)
        } catch(erro){
            console.error("Erro ao carregar pessoas:", erro);
        }
    }
    
    
    
    return(
        <div className="w-[95%] bg-amber-300">
            <Card className="w-[50%] mx-auto">
                <CardHeader>
                    <CardTitle className="flex justify-center text-3xl">Entradas Fixas no Mês</CardTitle>
                    <CardAction>
                        <Button
                        variant="secondary"
                        className="bg-[#12698A] font-bold"
                        >
                            <p>Nova Entrada</p>    
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                {entradasFixas.map((entradaFixa) => (
                    <div key={entradaFixa.id} className="flex p-1 border-b border-foreground">
                        <div className="w-1/3 flex">
                            <Button
                            variant="ghost"
                            >
                                <Pencil className="text-blue-500"/>
                            </Button>
                            <Button
                            variant="ghost"
                            >
                                <Trash className="text-red-500"/>
                            </Button>
                            <p className="p-1 mt-1">Descrição: {entradaFixa.descricao}</p>
                        </div>
                        <div className="w-1/3">
                            <p className="p-1 mt-1">
                            Valor:{" "}
                            {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(entradaFixa.valor)}
                            </p>
                        </div>
                        <div className="w-1/3">
                            <p className="p-1 mt-1">Data: {new Date(entradaFixa.dataReferencia).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
                </CardContent>

            </Card>
        </div>
        
    )
}