import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Modal } from "../component/modal";
import "../../styles/admon.css";

export const LoginAdministrator = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [error, seterror] = useState("");


	async function handlesubmit(e) {
		e.preventDefault()
		const formdata = new FormData(e.target);
		const adminlogin = {};
		for (const entrada of formdata.entries()) {
			adminlogin[entrada[0]] = entrada[1];
		}
		const response = await actions.loginadmin(adminlogin);
		if (response === "autorizado") {
			navigate("/profileadmon")
		} else {
			console.log("error desde front " + response.msg);
			seterror(response.msg);
			actions.openErrorlogin();
		}

	}

	return (
		<div className="d-flex justify-content-center row" >
			<div className="col-md-5 col-sm-8 my-4" >
				<div className="Administrador pt-4 pb-4 text-center bg-primary card-header col-md-5" style={{ color: 'white' }}>
					<h1>Hola Administrador</h1>
				</div>
				<div className="containerAdmon">
					{/* <div className="Administrador pt-4 pb-4 text-center bg-primary card-header col-md-6" style={{ color: 'white' }}>
						<h1>Hola Administrador</h1>
					</div> */}

					<div className="text-center w-75 m-auto"><p className="text-muted mb-4">A continuación digite su correo electronico y password</p></div>

					<div className="datos col-md-6 d-flex flex-column align-items-center">
						<form onSubmit={handlesubmit} className="text-center">
							<div className="mb-3">
								<label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico</label>
								<input type="email" placeholder="@" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
							</div>
							<div className="mb-3">
								<label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
								<input type="password" className="form-control" name="password" id="exampleInputPassword1" />
							</div>
							<div className="d-flex justify-content-center py-3">
								<button type="submit" className="btn btn-outline-secondary buttonHome">Ingresar</button>
								<Modal error={error} />
							</div>
						</form>
						<div className="text-center">
							<Link to="/admon">
								<span>¿No tienes cuenta? Regístrate acá</span>
							</Link>
						</div>
					
						<footer className="footer footer-alt min-vh-8 p-2">
							<div className="botonVolver">
								<Link to="/">
									<button type="button" className="btn btn-outline-secondary" disabled>
										Volver a Inicio
									</button>
								</Link>
							</div>
						</footer>
					</div>
				</div>
			</div>

		</div>
	);
};
