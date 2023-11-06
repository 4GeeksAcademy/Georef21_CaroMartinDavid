import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/admon.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
            <Link to="/admon">
			    <button type="button" className="btn btn-primary m-3">Registro Administrador</button>
            </Link>
            <Link to="/admons">
                <button type="button" className="btn btn-primary m-3">Administradores </button>
            </Link>
		</div>
	);
};