import { ClienteModel } from "../model/ClienteModel";

async function salvar(clienteModel: ClienteModel): Promise<ClienteModel> {
  return await fetch(`http://localhost:8080/api/cliente`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clienteModel),
  })
    .then((response) => response.json());
}

async function listar(): Promise<ClienteModel[]> {
  return await fetch(`http://localhost:8080/api/cliente`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => response.json());
}

async function buscarPorId(id: string | undefined): Promise<ClienteModel> {
  return await fetch(`http://localhost:8080/api/cliente/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => response.json());
}

const clienteApi = {
  salvar,
  listar,
  buscarPorId
};

export default clienteApi;