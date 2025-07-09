const BASE_URL = 'http://localhost:5189/api/Pessoas';

export async function fetchPessoas() {
  const res = await fetch(`${BASE_URL}/Display-Pessoas`, {
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Erro ao buscar pessoas');

  return res.json();
}

export async function criarPessoa(nome: string) {
    const res = await fetch(`${BASE_URL}/Create-Pessoa`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome })
});

 if (!res.ok) throw new Error('Erro ao criar pessoa');

  return res.json();
}

export async function deletarPessoa(id: number) {
  const res = await fetch(`${BASE_URL}/Delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Erro ao deletar Pessoa');
  }

  return await res.json();
}

export async function editarPessoa(id: number, name: string) {
  const res = await fetch(`${BASE_URL}/Edit/${id}`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({name})
  });

  if (!res.ok) {
    throw new Error('Erro ao deletar Pessoa');
  }
  return await res.json();
}
  
