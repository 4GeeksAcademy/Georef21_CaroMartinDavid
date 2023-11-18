import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { BsPersonCircle } from "react-icons/bs";
import LogoGeoref21 from '../../img/LogoGeoref21.png';

export const Navbarhome = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary Navbarhome" >
      <div className="container-fluid" >
        <a className="navbar-brand" href="/">
          <img src={LogoGeoref21} width="140" height="55" alt="Logo"/>
        </a>
        <div className="collapse navbar-collapse" id="navbarNav" >
          <ul className="navbar-nav" style={{ marginRight: "20px" }}>
            <li className="nav-item">
              <a className="nav-link active navInicio" aria-current="page" href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="admonLog">Administrador</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="logSpecialist">Especialista</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
