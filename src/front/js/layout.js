import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Administrator } from "./pages/admon";
import {DatosAdmon} from "./pages/datosadmons";
import { Home } from "./pages/home";
import {LoginAdministrator} from "./pages/loginadmon.js"
import { ProfileAdmon } from "./pages/profileadmon.js";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { DatosEspecialista} from "./pages/datosEspecialista.js";
import { Register } from "./pages/registerespecialist.js"; 
import {NavbarPerfilAdmon} from "./component/navbarperfiladmon.js"
import { NavbarEspecialista } from "./component/navbarEspecialista.js";
import injectContext from "./store/appContext";
import { VistaIncialEspecialista } from "./pages/vistaInicialEspecialista.js";
import {PerfilEspecialista} from "./pages/perfilEspecialista.js"
import { Footer } from "./component/footer";
import {FormGeolocation} from "./pages/formgeolocation.js"

import { CrearProyecto } from "./pages/CrearProyecto.jsx";
import { Proyecto } from "./pages/Proyecto.jsx";
import { Proyectos } from "./pages/Proyectos.jsx";
import { LoginSpecialist } from "./pages/loginSpecialist.jsx";
const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                   <NavbarPerfilAdmon/>
                   <NavbarEspecialista/>
                    <Routes>
                        {/* <Route element={<Home />} path="/" /> */}
                        <Route element={<FormGeolocation/>} path="/" />
                        <Route element={<LoginAdministrator/>} path="/admonlog" />
                        <Route element={<LoginSpecialist/>} path="/logSpecialist" />
                        <Route element={<Administrator />} path="/admon" />
                        <Route element={<Administrator />} path="/admon/:adminId" />
                        <Route element={<ProfileAdmon/>} path="/profileadmon" />
                        <Route element={<DatosAdmon />} path="/admons" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Register />} path="/registerespicialist" /> 
                        <Route element={<Register />} path="/registerespicialist/:id" /> 
                        <Route element={<DatosEspecialista />} path="/datosEspecialista" /> 
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<CrearProyecto />} path="/nuevoproyecto" />
                        <Route element={<Proyecto />} path="/Proyecto" />
                        <Route element={<Proyectos />} path="/listaproyectos" />
                        <Route element={<CrearProyecto />} path="/nuevoproyecto/:id" />
                        <Route element={<VistaIncialEspecialista />} path="/vInicial" />
                        <Route element={<PerfilEspecialista />} path="/perfilEspecialista" />
                    </Routes>
                    
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
