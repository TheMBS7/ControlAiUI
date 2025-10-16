"use client"

import Link from "next/link"
import { fetchPeriodos } from "../services/mesService"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchExtratoId } from "../services/extratoService";
import { calculoTotal } from "../services/calculoTotalService";

export default function Extratos(){

    const [meses, setMeses] = useState<Mes[]>([]);
    const [anos, setAnos] = useState<number[]>([]);
    const [anoSelecionado, setAnoSelecionado] = useState<string>(String(new Date().getFullYear()))
    const [totalSomada, setTotalSomado] = useState<TotalMes[]>([])


    const bordas= "w-60 p-[15px] pb-[40px] !bg-[#12698A] rounded-xl transition duration-200 ease-in-out hover:-translate-y-3 hover:scale-110"
    const centro = "w-full h-full bg-foreground rounded-t-md flex flex-col items-center justify-center overflow-hidden";

    const textoMes ="text-foreground justify-center flex mt-1 text-2xl font-bold"
    const conteudoDiv ="p-4 justify-center flex text-background"
    
    useEffect(() => {
        carregarPeriodos();
        calculandoTotal()
    },[anoSelecionado])

     
    async function carregarPeriodos() {
        try{
            const data = await fetchPeriodos();
            const mesesFiltrados = data.filter((mes) => new Date(mes.dataInicial).getUTCFullYear() === parseInt(anoSelecionado));
            setMeses(mesesFiltrados);

            const listaDeAnos = [...new Set(data.map((mes) => new Date(mes.dataInicial).getUTCFullYear()))]
            setAnos(listaDeAnos)

        }catch(erro){
            alert("Erro ao trazer periodos.")
        }
    } 

    

    async function calculandoTotal() {
        try{
            const data = await calculoTotal(parseInt(anoSelecionado));
            setTotalSomado(data ?? []);
        }catch(erro){
            alert("Erro ao calcular totais.")
        }
        
        
    }

//    async function calculoTotal() {
//         try {

//             const data = await fetchPeriodos();
//             const mesesFiltrados = data.filter((mes) => new Date(mes.dataInicial).getUTCFullYear() === parseInt(anoSelecionado));

//             const idMes = [... new Set(mesesFiltrados.map((mes) => mes.id))]

//             const resultados = await Promise.all(
//                 idMes.map(async (id) => {
//                     console.log("Buscando extrato do mês ID:", id)
//                     const extratosFiltrados = await fetchExtratoId(id);

//                     let totalMes = 0;
//                     extratosFiltrados.forEach((extrato) => {
//                         totalMes += Number(extrato.valorTotal);
                        
//                     });
//                     console.log("printando o total", totalMes)
//                     return {mesId: id, totalMes};
//                 })
//             );
//             console.log("printando o resultado", resultados)
//             setTotalSomado(resultados);

//         } catch (erro) {
//             console.error("erro para calcular o total do mês", erro)
//         }
//     }

    return (

        <div>
            <div className="relative w-full mt-4">
                <div className="flex justify-end mr-[250px] gap-2">
                    <Select
                    value={anoSelecionado}
                    onValueChange={(value) => setAnoSelecionado(value)}
                    >
                        <SelectTrigger className="w-[110px]">
                        <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup>
                            <SelectLabel className="text-center">Anos</SelectLabel>
                            {anos.map((ano) => (
                            <SelectItem value={String(ano)} key={ano}>
                                {ano}
                            </SelectItem>
                            ))}
                        </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button
                    variant="ghost"
                    className="bg-[#12698A] font-bold"
                    >
                        Novo Periodo
                    </Button>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <div className="grid justify-items-center grid-cols-1 lg:grid-cols-4 gap-[90px] mt-[18px]">
                    {meses.map((mes: Mes) => {
                    
                        return(
                            <Link key={mes.id} href={`extratos/${mes.id}`} className={bordas}>
                                <div className={centro}>
                                    <p className={conteudoDiv}>Saldo Final:</p>
                                    <p className={`text-4xl justify-center flex font-bold ${(totalSomada.find((t) => t.mesId === mes.id)?.totalMes ?? 0) < 0 ? "text-red-500" : "text-green-500"}`}>
                                    {totalSomada
                                        .find((t) => t.mesId === mes.id)
                                        ?.totalMes
                                        ?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? 'R$ 0,00'}
                                    </p>
                                </div>
                                <h1 className={textoMes}>{mes.descricao}</h1>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
        
                   
                
            
    )
}