export default function Extratos(){

    const bordas= "w-60 p-[15px] pb-[40px] !bg-[#12698A] rounded-xl transition duration-200 ease-in-out hover:-translate-y-3 hover:scale-110"
    const centro= "w-full h-full !bg-foreground rounded-t-md"
    const textoMes ="text-foreground justify-center flex mt-1 text-2xl font-bold"
    const conteudoDiv ="p-4 justify-center flex text-background"

    return (
        <div> {/* verificar o porque */}

        
        <div className="w-full flex justify-center">
            <div className="grid justify-items-center grid-cols-1 lg:grid-cols-4 gap-30 mt-25 ">

                <div className={bordas}>
                    <div className={centro}>
                        <p className={conteudoDiv}>Saldo Final: <br /> Variavel</p>
                    </div>
                    <h1 className={textoMes}>Janeiro</h1>
                </div>

                <div className={bordas}>
                    <div className={centro}>
                        <p className={conteudoDiv}>Saldo Final: <br /> Variavel</p>
                    </div>
                    <h1 className={textoMes}>Fevereiro</h1>
                </div>

                <div className={bordas}>
                    <div className={centro}>
                        <p className={conteudoDiv}>Saldo Final: <br /> Variavel</p>
                    </div>
                    <h1 className={textoMes}>Março</h1>
                </div>

                <div className={bordas}>
                    <div className={centro}>
                        <p className={conteudoDiv}>Saldo Final: <br /> Variavel</p>
                    </div>
                    <h1 className={textoMes}>Abril</h1>
                </div>

            </div>
        </div>

        <div className="w-full flex justify-center">
            <div className="grid justify-items-center grid-cols-1 lg:grid-cols-4 gap-30  mt-25 ">

                <div className={bordas}>
                    <div className={centro}>
                        <p className={conteudoDiv}>Saldo Final: <br /> Variavel</p>
                    </div>
                    <h1 className={textoMes}>Maio</h1>
                </div>

                <div className={bordas}>
                    <div className={centro}>
                        <p className={conteudoDiv}>Saldo Final: <br /> Variavel</p>
                    </div>
                    <h1 className={textoMes}>Junho</h1>
                </div>

                <div className={bordas}>
                    <div className={centro}>
                        <p className={conteudoDiv}>Saldo Final: <br /> Variavel</p>
                    </div>
                    <h1 className={textoMes}>Julho</h1>
                </div>

                <div className={bordas}>
                    <div className={centro}>
                        <p className={conteudoDiv}>Saldo Final: <br /> Variavel</p>
                    </div>
                    <h1 className={textoMes}>Agosto</h1>
                </div>

            </div>
        </div>
        
        <div className="w-full flex justify-center">
            <div className="grid justify-items-center grid-cols-1 lg:grid-cols-4 gap-30  mt-25 ">

                <div className={bordas}>
                    <div className={centro}>
                        <p className={conteudoDiv}>Saldo Final: <br /> Variavel</p>
                    </div>
                    <h1 className={textoMes}>Setembro</h1>
                </div>

                <div className={bordas}>
                    <div className={centro}>
                        <p className={conteudoDiv}>Saldo Final: <br /> Variavel</p>
                    </div>
                    <h1 className={textoMes}>Outubro</h1>
                </div>

                <div className={bordas}>
                    <div className={centro}>
                        <p className={conteudoDiv}>Saldo Final: <br /> Variavel</p>
                    </div>
                    <h1 className={textoMes}>Novembro</h1>
                </div>

                <div className={bordas}>
                    <div className={centro}>
                        <p className={conteudoDiv}>Saldo Final: <br /> Variavel</p>
                    </div>
                    <h1 className={textoMes}>Dezembro</h1>
                </div>

            </div>
        </div>



        </div>
    )
}