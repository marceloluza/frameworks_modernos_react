import { ProdutoModel } from "../model/ProdutoModel";

async function salvar(produtoModel: ProdutoModel): Promise<ProdutoModel> {
  return await fetch(`http://localhost:8080/api/produto`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produtoModel),
  }).then((response) => response.json());
}

async function listar(): Promise<ProdutoModel[]> {
  return await fetch(`http://localhost:8080/api/produto`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

async function buscarPorId(id: string | undefined): Promise<ProdutoModel> {
  return await fetch(`http://localhost:8080/api/produto/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

async function apagar(id: number): Promise<void> {
  return await fetch(`http://localhost:8080/api/produto/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Não foi possível apagar o produto.");
    }
  });
}

const produtoApi = {
  salvar,
  listar,
  buscarPorId,
  apagar, 
};

export default produtoApi;
