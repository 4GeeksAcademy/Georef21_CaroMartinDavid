import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Administrator } from "./pages/admon";
import {DatosAdmon} from "./pages/datosadmons";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { PerfilEspecialista} from "./pages/perfilEspecialista";
import { Register } from "./pages/register"; // Importa el componente de registro que creaste
import {Visits } from "./pages/visits.js";

import injectContext from "./store/appContext";


import { Footer } from "./component/footer";

import { CrearProyecto } from "./pages/CrearProyecto.jsx";
import { Proyecto } from "./pages/Proyecto.jsx";
import { Proyectos } from "./pages/Proyectos.jsx";
const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

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
                        <Route element={<Register />} path="/register" />
                        <Route element={<Visits />} path="/visit" />
                        <Route element={<PerfilEspecialista />} path="/perfilEspecialista" /> 
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
