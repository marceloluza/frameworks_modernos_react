import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import clienteApi from "../api/ClienteApi";
import { Params, useParams } from "react-router-dom";
import AlertPage from "../utils/AlertPage";

const ClientePage: React.FC<{}> = ({ }) => {
    const [id, setId] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const { idCliente } = useParams<Params>();
    
    useEffect(() => {
        console.log(idCliente);
        if (idCliente !== undefined) {
            clienteApi.buscarPorId(idCliente).then(cliente => {
                setId(id);
                setNome(cliente.nome);
                setEmail(cliente.email);
                setHobbies(cliente.hobbies);
            });
        }        
    }, [idCliente]);
    
    const salvarCliente = () => {
        console.log('clicou na função salvar');
        let clienteModel = {
            id: id,
            nome: nome,
            email: email,
            hobbies: hobbies
        };

        setIsLoading(true);
        clienteApi.salvar(clienteModel).then(retorno => {
            console.log(retorno);
            setMessage('Cadastro realizado com sucesso.')
            setVariant('success');
            setIsLoading(false);
            setShowErrorMessage(true);            
        }, error => {
            console.log(error);
            setMessage('Não foi possível realizar o cadastro.');
            setVariant('danger');
            setIsLoading(false);
            setShowErrorMessage(true);
        }
        )
    };

    return (
        <>
            <h2>Cadastro de Clientes</h2>
            <AlertPage message={message} variant={variant} show={showErrorMessage} ></AlertPage>

            <Form>
                <Form.Group className="mb-3" controlId="clientePage.nome">
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control value={nome} onChange={(e) => {
                        setNome(e.target.value);
                    }} type="text" placeholder="Digite seu nome" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="clientePage.email">
                    <Form.Label>E-mail:</Form.Label>
                    <Form.Control value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }} type="email" placeholder="Digite seu email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="clientePage.hobbies">
                    <Form.Label>Hobbies:</Form.Label>
                    <Form.Control value={hobbies} onChange={(e) => {
                        setHobbies(e.target.value);
                    }} as="textarea" rows={3} />
                </Form.Group>
                <Button variant="primary"
                    disabled={isLoading}
                    onClick={salvarCliente}>Salvar</Button>{' '}

                {isLoading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    null
                )}

            </Form>
        </>
    );

};

export default ClientePage;
