import { fetchExtratoId } from "./extratoService";
import { fetchPeriodos } from "./mesService";

export async function calculoTotal(ano: number) : Promise<TotalMes[]> {
        try {
            // Levar a logica para o back
            const data = await fetchPeriodos();
            const mesesDoAno = data.filter((mes) => new Date(mes.dataInicial).getUTCFullYear() === ano);

            const idMes = [... new Set(mesesDoAno.map((mes) => mes.id))] // transforma []Mês para apenas []id do mês

            const resultados = await Promise.all(
                idMes.map(async (id) => {
                    //console.log("Buscando extrato do mês ID:", id)
                    const extratosFiltrados = await fetchExtratoId(id);

                    let totalMes = 0;
                    extratosFiltrados.forEach((extrato) => {
                        if(extrato.tipoMovimentoId === 1){
                            totalMes += Number(extrato.valorTotal);
                        } 
                        else{
                            totalMes -= Number(extrato.valorTotal);
                        }                        
                    });

                    //console.log("printando o total", totalMes)
                    return {mesId: id, totalMes};
                })
            );
            //console.log("printando o resultado", resultados)
            return (resultados);

        } catch (erro) {
            console.error("erro para calcular o total do mês", erro)
            return [];
        }
    }
