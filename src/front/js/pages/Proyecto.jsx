import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Proyecto = () => {

    return (
        <div className="mt-5">
            <Link to="/NuevoProyecto">
                <button type="button" className="btn btn-primary btn-lg">Nuevo Proyecto</button></Link>
            <Link to="/ListaProyectos">
                <button type="button" className="btn btn-primary btn-lg">Proyectos</button></Link>

        </div>
    );
};

export default Proyecto;