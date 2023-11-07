import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Administrator } from "./pages/admon";
import {DatosAdmon} from "./pages/datosadmons";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";


import { Footer } from "./component/footer";

import { CrearProyecto } from "./pages/CrearProyecto.jsx";
import { Proyecto } from "./pages/Proyecto.jsx";
import { Proyectos } from "./pages/Proyectos.jsx";
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                   
                    <Routes>
                        <Route element={<Home />} path="/home" />
                        <Route element={<Administrator />} path="/admon" />
                        <Route element={<Administrator />} path="/admon/:adminId" />
                        <Route element={<DatosAdmon />} path="/admons" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<CrearProyecto />} path="/NuevoProyecto" />
                        <Route element={<Proyecto />} path="/" />
                        <Route element={<Proyectos />} path="/ListaProyectos" />
                        <Route element={<CrearProyecto />} path="/NuevoProyecto/:id" />
                    </Routes>
                    
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
