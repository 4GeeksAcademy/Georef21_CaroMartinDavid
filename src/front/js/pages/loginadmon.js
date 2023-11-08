import React , { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Modal } from "../component/modal";
import "../../styles/admon.css";

export const LoginAdministrator = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [error, seterror]= useState("");
    

    async function handlesubmit(e){
        e.preventDefault()
        const formdata = new FormData(e.target);
        const adminregistro= {};
        for (const entrada of formdata.entries()){
            adminregistro[entrada[0]]=entrada[1];
        } 
		 
    }

	return (
		<div className="container">
			<h1>Login Administrador</h1>
			<div className="col-md-6">
				<form onSubmit={handlesubmit}>
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">Correo electronico</label>
						<input type="email" className="form-control" id="exampleInputEmail1" name="email" defaultValue={adminData.email} aria-describedby="emailHelp"/>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
						<input type="password" className="form-control" name="password"  id="exampleInputPassword1"/>
					</div>
					<div className="d-flex justify-content-center py-3">
						<button type="submit" className="btn btn-primary">Enviar</button>
						<Modal error={error}/>
					</div>
				</form>
        	</div>
			
		</div>
	);
};
