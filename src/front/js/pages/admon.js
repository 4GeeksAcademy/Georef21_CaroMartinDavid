import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { RegAdmon } from "../component/regAdmon";
import "../../styles/admon.css";

export const Admon = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<h1>Registro Administrador</h1>
			<RegAdmon/>
			
		</div>
	);
};
