import React, { useEffect, useState } from "react";
import { Alert, Button, Spinner, Table } from "react-bootstrap";
import produtoApi from "../api/ProdutoApi";
import { ProdutoModel } from "../model/ProdutoModel";
import { useNavigate } from "react-router-dom";
import AlertPage from "../utils/AlertPage";

const ListaProdutoPage: React.FC<{}> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [produtos, setProdutos] = useState<ProdutoModel[]>([]);
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    produtoApi.listar().then(
      (result) => {
        setProdutos(result);
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
        setIsLoading(false);

        setMessage("Não foi possível carregar lista de produtos.");
        setVariant("danger");
        setShowErrorMessage(true);
      }
    );
  }, []);

  const carregarProduto = (id: number | null) => {
    navigate(`/produto/${id}`);
  };

  const apagarProduto = (id: number | null) => {
    if (id !== null) {
      setIsLoading(true);
      produtoApi.apagar(id).then(
        () => {
          setProdutos((prevProdutos) =>
            prevProdutos.filter((produto) => produto.id !== id)
          );
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
          setMessage("Não foi possível apagar o produto.");
          setVariant("danger");
          setShowErrorMessage(true);
          setIsLoading(false);
        }
      );
    }
  };

  return (
    <>
      <h2>Lista de Produtos</h2>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : null}

      <AlertPage
        message={message}
        variant={variant}
        show={showErrorMessage}
      ></AlertPage>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, key) => {
            return (
              <tr key={key}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>{produto.categoria}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      carregarProduto(produto.id);
                    }}
                  >
                    Carregar
                  </Button>
                </td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      apagarProduto(produto.id);
                    }}
                  >
                    Apagar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ListaProdutoPage;
