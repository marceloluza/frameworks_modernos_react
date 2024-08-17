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

const clienteApi = {
  salvar
};

export default clienteApi;