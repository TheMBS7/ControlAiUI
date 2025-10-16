const BASE_URL = 'http://localhost:5189/api/Extratos';


export async function fetchExtratos() {
  const res = await fetch(`${BASE_URL}/Display-Extratos`, {
    cache: 'no-store' // para sempre buscar dados atualizados
  });
  if (!res.ok) {
    throw new Error('Falha ao carregar os extratos');
  }
  return res.json();
}

export async function fetchExtratoId(mesId) : Promise<Extrato[]> {
  const res = await fetch(`${BASE_URL}/Display-Extrato/${mesId}`, {
    cache: 'no-store' // para sempre buscar dados atualizados
  });

  if(res.status === 404) {
    return [];
  }

  if (!res.ok) {
    throw new Error('Falha ao carregar os extratos');
  }
  return res.json();
}


export async function createExtrato(extrato: Extrato) {
  const response = await fetch(`${BASE_URL}/Create-Extratos`,{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
            ...extrato,
            data: extrato.data.toISOString()
        })
  });
    if(!response.ok) throw new Error("Erro ao crias extrato");
    return response.json();
}

export async function deleteExtrato(id: number, ExcluirTodasParcelas: boolean) {
  const response = await fetch(`${BASE_URL}/Delete/${id}`,{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      ExcluirParcelas: ExcluirTodasParcelas 
    }),
  })
  if(!response.ok) throw new Error("Erro ao deletar lançamento");
  return;
}

export async function editExtrato(extrato: Extrato) {
  const responde = await fetch(`${BASE_URL}/Edit/${extrato.id}`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(extrato)
  });
  if(!responde.ok) throw new Error("Erro ao editar Extrato")
}