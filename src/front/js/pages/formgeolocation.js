import React , { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Modal } from "../component/modal";

export const Formgeolocation= () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [error, seterror]= useState("");
    const { adminId } = useParams();


	return (
		<div className="map">
			
		</div>
	);
};
