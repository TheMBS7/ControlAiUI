import Link from "next/link"


export default function Extratos(){

    const bordas= "w-60 p-[15px] pb-[40px] !bg-[#12698A] rounded-xl transition duration-200 ease-in-out hover:-translate-y-3 hover:scale-110"
    const centro= "w-full h-full !bg-foreground rounded-t-md"
    const textoMes ="text-foreground justify-center flex mt-1 text-2xl font-bold"
    const conteudoDiv ="p-4 justify-center flex text-background"

    const meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]

    return (

        <div>
            <div className="w-full flex justify-center">
                <div className="grid justify-items-center grid-cols-1 lg:grid-cols-4 gap-30 mt-25 ">
                    {meses.map((mes,index) => {
                        return(
                            <Link key={index} href={`extratos/${index+1}`} className={bordas}>
                                <div className={centro}>
                                    <p className={conteudoDiv}>Saldo Final: <br /> Variavel</p>
                                </div>
                            <h1 className={textoMes}>{mes}</h1>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}