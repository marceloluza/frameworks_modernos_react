import React, { useEffect, useState } from "react";
import { Alert, Button, Spinner, Table } from "react-bootstrap";
import clienteApi from "../api/ClienteApi";
import { ClienteModel } from "../model/ClienteModel";
import { useNavigate } from "react-router-dom";
import AlertPage from "../utils/AlertPage";

const ListaClientePage: React.FC<{}> = ({ }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [clientes, setClientes] = useState<ClienteModel[]>([]);    
    const [variant, setVariant] = useState('');
    const [message, setMessage] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        clienteApi.listar().then(result => {
            setClientes(result);
            setIsLoading(false);
        }, error => {
            console.log(error);
            setIsLoading(false);
            
            setMessage('Não foi possível carregar lista de clientes.');
            setVariant('danger');
            setShowErrorMessage(true);            
        });
    }, []);

    const carregarCliente = (id: number | null) => {
        navigate(`/cliente/${id}`);
    };

    return (
        <>
            <h2>Lista de Clientes</h2>
            {isLoading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                null
            )}

            <AlertPage message={message} variant={variant} show={showErrorMessage} ></AlertPage>

            <Table striped bordered hover>
                <thead>
                    <tr >
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Hobbies</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clientes.map((cliente, key) => {
                            return (
                                <tr key={key}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.hobbies}</td>
                                    <td><Button variant="secondary"
                                        onClick={() => {
                                            carregarCliente(cliente.id);
                                        }}>Carregar</Button></td>
                                </tr>
                            )
                        }
                        )
                    }
                </tbody>
            </Table>
        </>
    );

};

export default ListaClientePage;
