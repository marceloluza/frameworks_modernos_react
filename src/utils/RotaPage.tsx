import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientePage from "../pages/ClientePage";
import ListaClientePage from "../pages/ListaClientePage";

const RotaPage: React.FC<{}> = ({ }) => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/cliente" element={<ClientePage />} />
                    <Route path="/cliente/:idCliente" element={<ClientePage />} />
                    <Route path="/lista-cliente" element={<ListaClientePage />} />

                </Routes>
            </BrowserRouter>
        </>
    );

};

export default RotaPage;
