
import CategoriaCard from "./categoriaCard"
import PessoasCard from "./pessoasCard"

export default function Configuracao() {
  return (
    <div className="grid justify-items-center grid-cols-1 lg:grid-cols-2">
      <CategoriaCard />
      <PessoasCard />
    </div>
  )
}
