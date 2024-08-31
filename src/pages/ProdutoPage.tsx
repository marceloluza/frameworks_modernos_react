import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import produtoApi from "../api/ProdutoApi";
import { Params, useParams } from "react-router-dom";
import AlertPage from "../utils/AlertPage";

const ProdutoPage: React.FC<{}> = ({}) => {
  const [id, setId] = useState(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const { idProduto } = useParams<Params>();

  useEffect(() => {
    console.log(idProduto);
    if (idProduto !== undefined) {
      produtoApi.buscarPorId(idProduto).then((produto) => {
        setId(id);
        setNome(produto.nome);
        setDescricao(produto.descricao);
        setCategoria(produto.categoria);
      });
    }
  }, [idProduto]);

  const salvarProduto = () => {
    console.log("clicou na função salvar");
    let produtoModel = {
      id: id,
      nome: nome,
      descricao: descricao,
      categoria: categoria,
    };

    setIsLoading(true);
    produtoApi.salvar(produtoModel).then(
      (retorno) => {
        console.log(retorno);
        setMessage("Cadastro realizado com sucesso.");
        setVariant("success");
        setIsLoading(false);
        setShowErrorMessage(true);
      },
      (error) => {
        console.log(error);
        setMessage("Não foi possível realizar o cadastro.");
        setVariant("danger");
        setIsLoading(false);
        setShowErrorMessage(true);
      }
    );
  };

  return (
    <>
      <h2>Cadastro de Produtos</h2>
      <AlertPage
        message={message}
        variant={variant}
        show={showErrorMessage}
      ></AlertPage>

      <Form>
        <Form.Group className="mb-3" controlId="produtoPage.nome">
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
            }}
            type="text"
            placeholder="Digite o nome"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="produtoPage.descricao">
          <Form.Label>Descrição:</Form.Label>
          <Form.Control
            value={descricao}
            onChange={(e) => {
              setDescricao(e.target.value);
            }}
            type="descricao"
            placeholder="Digite a descricao"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="produtoPage.categoria">
          <Form.Label>Categoria:</Form.Label>
          <Form.Control
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
            }}
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Button variant="primary" disabled={isLoading} onClick={salvarProduto}>
          Salvar
        </Button>{" "}
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : null}
      </Form>
    </>
  );
};

export default ProdutoPage;
