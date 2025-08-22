import EntradaFixaCard from "./entradaFixaCard";
import SaidaFixaCard from "./saidaFixaCard";

export default function  MeuPerfil(){



    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <EntradaFixaCard/>
            <SaidaFixaCard/>
        </div>
    )

}