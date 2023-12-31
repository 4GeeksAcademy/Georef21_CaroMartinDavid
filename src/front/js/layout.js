import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Administrator } from "./pages/admon";
import { DatosAdmon } from "./pages/datosadmons";
import { Home } from "./pages/home";
import { RegVisits } from "./pages/regvisits.js";
import { LoginAdministrator } from "./pages/loginadmon.js"
import { Sidebar } from "./component/sidebar.js"
import { ProfileAdmon } from "./pages/profileadmon.js";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { DatosEspecialista } from "./pages/datosEspecialista.js";
import { Register } from "./pages/registerespecialist.js";
import { Navbarhome } from "./component/navbarhome.js"
import { NavbarPerfilAdmon } from "./component/navbarperfiladmon.js"
// import { NavbarEspecialista } from "./component/navbarEspecialista.js";
import injectContext from "./store/appContext";
import { VistaIncialEspecialista } from "./pages/vistaInicialEspecialista.js";
import { PerfilEspecialista } from "./pages/perfilEspecialista.js"
import { Footer } from "./component/footer";
import { PerfilVisitasEsp } from "./pages/visitaesp.js";
import { CrearProyecto } from "./pages/CrearProyecto.jsx";
import { Proyecto } from "./pages/Proyecto.jsx";
import { Proyectos } from "./pages/Proyectos.jsx";
import { DataCaptureRegister } from "./pages/tomaDeDatos.js";
import { PerfilVisitas } from "./pages/verVisitas.js";
import { LoginSpecialist } from "./pages/loginSpecialist.jsx";
import { PerfilProjectEsp } from "./pages/projectEsp.js";
import { DataCapture } from "./pages/vistadatos.js";
import { DatasCapture } from "./pages/datoscapturados.js";
import { Context } from "./store/appContext.js";
import {DatasCaptureCard} from "./pages/datoscapturadoscard.js"



const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;
    const { store, actions } = useContext(Context);

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

	useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return (
        <div style={{backgroundColor:"#f6f7fb"}}>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <NavbarPerfilAdmon />
                    <div className="controutes d-flex justify-content-center">
                    {store.session === true || (store.sessionSpecialist === true && isSmallScreen === false)  ?

                        <div className ="col-md-2" > 
                            <Sidebar />
                        </div> :<></>
                    }
                        <div className="col-10 m-0 p-0" style= {{backgroundColor:"#f6f7fb"}}>
                                <Routes>
                                    <Route element={<Home />} path="/" />
                                    <Route element={<LoginAdministrator />} path="/admonlog" />
                                    <Route element={<LoginSpecialist />} path="/logSpecialist" />
                                    <Route element={<Administrator />} path="/admon" />
                                    <Route element={<Administrator />} path="/admon/:adminId" />
                                    <Route element={<ProfileAdmon />} path="/profileadmon" />
                                    <Route element={<DatosAdmon />} path="/admons" />
                                    <Route element={<Demo />} path="/demo" />
                                    <Route element={<Single />} path="/single/:theid" />
                                    <Route element={<Register />} path="/registerespicialist" />
                                    <Route element={<Register />} path="/registerespicialist/:id" />
                                    <Route element={<DatosEspecialista/>} path="/specialist" />
                                    <Route element={<PerfilEspecialista />} path="/perfilEspecialista" />
                                    <Route element={<h1>Not found!</h1>} />
                                    <Route element={<CrearProyecto />} path="/nuevoproyecto" />
                                    <Route element={<Proyecto />} path="/Proyecto" />
                                    <Route element={<RegVisits />} path="/regvisit" />
                                    <Route element={<PerfilVisitas />} path="/perfilVisitas" />
                                    <Route element={<PerfilVisitasEsp />} path="/perfilvisitasEsp" />
                                    <Route element={<PerfilProjectEsp />} path="/perfilprojEsp" />
                                    <Route element={<RegVisits />} path="/regvisit/:id" />
                                    <Route element={<DataCaptureRegister />} path="/captdatareg" />
                                    <Route element={<Proyectos />} path="/listaproyectos" />
                                    <Route element={<CrearProyecto />} path="/nuevoproyecto/:id" />
                                    <Route element={<VistaIncialEspecialista />} path="/vInicial" />
                                    <Route element={<PerfilEspecialista />} path="/perfilEspecialista" />
                                    <Route element={< DataCapture />} path="/vistaDatos" />
                                    <Route element={< DatasCapture />} path="/datacapture" />
                                    <Route element={<DataCaptureRegister />} path="/captdatareg/:id" />
                                    <Route element={<DatasCaptureCard />} path="/captdatacard/:id" />
                                </Routes>
                        
                        </div>
                    </div>
                        {/* </div> */}
                    </ScrollToTop>
                </BrowserRouter>
            </div>
    );
};

export default injectContext(Layout);
