'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchCategorias } from "../services/categoriaService";
import { useEffect, useState } from "react";

export default function EntradaFixaCard(){
    const [entradasFixas, setEntradasFixas] = useState<{id: number; descricao:string; valor:number; dataReferencia:Date}[]>([])
    

    useEffect(() => {
        carregarEntradasFixas();
    },[])

    
    async function carregarEntradasFixas() {
        try{
            const data = await fetchCategorias()
            setEntradasFixas(data)
        } catch(erro){
            console.error("Erro ao carregar pessoas:", erro);
        }
    }
    
    
    
    return(
        <div className="w-[95%] bg-amber-300">
            <Card className="w-[50%] mx-auto">
                <CardHeader>
                    <CardTitle>Entradas Fixas</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        {entradasFixas.map((entradaFixa) => (
                            <li key={entradaFixa.id}>
                                <div>
                                    <p>Toma: {entradaFixa.descricao}</p>
                                </div>

                            </li>
                        ))}

                    </ul>
                </CardContent>
            </Card>
        </div>
        
    )
}