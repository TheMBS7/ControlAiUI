import React, { } from 'react';

async function fetchExtratos() {
  const res = await fetch('http://localhost:5189/api/Extratos/Display-Extratos', {
    cache: 'no-store' // para sempre buscar dados atualizados
  });
  if (!res.ok) {
    throw new Error('Falha ao carregar os extratos');
  }
  return res.json();
}

export default async function ExtratosPage({
  params,
}: {
  params: Promise<{ mes: string }>
})  {

  const {mes} = await params; // Pega o Id o Mês
  const extratos = await fetchExtratos();

  console.log("=======================================EXTRATOS")
  console.log(extratos);
  // Filtra apenas os extratos com mesId === 1
  const extratosFiltrados = extratos.filter((extrato: any) => extrato.mesId === parseInt(mes));
  console.log("=======================================EXTRATOS FILTRADOS")  
  console.log(extratosFiltrados);
  // Pega a descrição do mês (se existir)
  const nomeDoMes = extratosFiltrados[0]?.mes?.descricao ?? 'Mês não encontrado';

  return (
    <div>
      <h1>Lista dos lançamentos de {nomeDoMes}</h1>
      <ul>
        {extratosFiltrados.map((extrato: any) => (
          <li key={extrato.id}>
            {extrato.descricao} - R${extrato.valorTotal}
          </li>
        ))}
      </ul>
    </div>
  );
}
