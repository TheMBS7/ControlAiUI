const BASE_URL = 'http://localhost:5189/api/EntradasFixas';

export async function fetchEntradasFixas() {
    const res = await fetch(`${BASE_URL}/Display-EntradasFixas`, {
        cache: "no-store"
    
    });
    if (!res.ok) throw new Error("Erro ao buscar Entradas Fixas");

    return res.json();
}
