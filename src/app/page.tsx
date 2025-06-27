export default function Home() {
  const botaoClasse =" shadow-xl/30 shadow-[#12698A]  border-4 border-[#12698A] w-60 md:w-80 text-2xl md:text-3xl font-bold text-[#242424] bg-white py-3 md:py-4 rounded-md hover:bg-[#12698A] duration-150 text-center -mb-7";
 

  return (
    

    <section className=" text-white ">
      <div className="text-center">
        <div>
          <h1 className="text-7xl mt-25 md:text-9xl italic font-bold " >ControlAí</h1>
        
        </div>

        <div className="mt-15 flex justify-center">
          <h1 className={botaoClasse}>Meu Perfil</h1>
        </div>

        <div className="mt-15 flex justify-center">
          <h1 className={botaoClasse}>Extratos</h1>
        </div>

        <div className="mt-15 flex justify-center">
          <h1 className={botaoClasse}>Projeção Anual</h1>
        </div>
        
      </div>
      
    </section>
      
        
      


  );
}
