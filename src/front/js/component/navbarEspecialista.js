import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { BsPersonCircle } from "react-icons/bs";


export const NavbarEspecialista = () => {
    const { store, actions } = useContext(Context);



    return (
        <div className="d-flex justify-content-center">
            <nav className="navbar navbar-light bg-light col-md-10 d-flex justify-content-end">
                <div >

                    <div className="d-flex justify-content-center ">
                        {store.sessionSpecialist === true ?
                            <>

                                <div className="dropdown">
                                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <BsPersonCircle /> {store.specialist.nombre} {store.specialist.apellido}
                                    </a>

                                    <ul className="dropdown-menu">
                                        <li><Link to="/datosEspecialista">
                                            <span>Mi Perfil</span>
                                        </Link></li>
                                        <li><Link to="/">
                                            <span onClick={() => { actions.logoutSpecialist() }}> Cerrar sesión</span>
                                        </Link></li>
                                    </ul>
                                </div>
                                <Link to="/">
                                    <button className="btn btn-danger mx-3 px-1" onClick={() => { actions.logoutSpecialist() }}>Log Out </button>
                                </Link>

                            </>
                            : <span></span>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
};