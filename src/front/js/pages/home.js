import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/admon.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
            <Link to="/">
			    <button type="button" className="btn btn-primary m-3">Administrador</button>
            </Link>
            <Link to="/logSpecialist">
                <button type="button" className="btn btn-primary m-3">Especialista</button>
            </Link>
		</div>
	);
};