import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { Modal } from "../component/modal";
import { ModalSuccess } from "../component/modalsuccess";
import { uploadFile } from "../../../firebase/config";
import "../../styles/admon.css";

export const Administrator = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [error, seterror] = useState("");
	const { adminId } = useParams();

	const [adminData, setAdminData] = useState({
		name: "",
		lastname: "",
		birthday: "",
		email: "",
		position: "",
		password: "",
		
	});

	useEffect(() => {
		console.log("adminId:", adminId);
		if (adminId) {
			if (store.administrator.id == adminId) {
				// Si adminId está presente en la URL, llena el estado adminData con los datos del administrador a editar
				const adminToEdit = store.administrator;
				if (adminToEdit) {
					const formattedBirthday = format(new Date(adminToEdit.birthday), "yyyy-MM-dd");
					adminToEdit.birthday = formattedBirthday;
					setAdminData(adminToEdit);
				}
			}
		}


	}, [adminId, store.administrator]);

	function edad(date) {
		const birthday = Date.parse(date)
		const today = new Date();
		const edadAdmin = Math.floor((today - birthday) / (1000 * 60 * 60 * 24 * 365));
		return edadAdmin
	}

	async function handlesubmit(e) {
		e.preventDefault()
		e.persist();
		const formdata = new FormData(e.target);
		const adminregistro = {};
		for (const entrada of formdata.entries()) {
			adminregistro[entrada[0]] = entrada[1];
		}
		if (adminId) {
			if (adminregistro.name != "" && adminregistro.lastname != "" && adminregistro.birthday != "" && adminregistro.email != "" && adminregistro.position != "" ) {
				const edadadmin = edad(adminregistro.birthday);
				if (edadadmin >= 18) {
					await actions.putadmin(adminId, adminregistro);
					actions.getadmins();
					navigate("/profileadmon");

				} else {
					console.log("es menor de edad");
					seterror("es menor de edad");
					actions.openErrorlogin();
				}
			} else {
				console.log("diligencie los datos");
				seterror("diligencie los datos");
				actions.openErrorlogin();
			}
		}
		else {
			if (adminregistro.name != "" && adminregistro.lastname != "" && adminregistro.birthday != "" && adminregistro.email != "" && adminregistro.position != "" && adminregistro.password != "" &&adminregistro.image_admon != "" ) {
				const edadadmin = edad(adminregistro.birthday);
				if (edadadmin >= 18) {
					try {
						const urlimage = await uploadFile(adminregistro.image_admon, "admon");
						adminregistro.image_admon = urlimage;
						console.log(urlimage);
						}catch(error){
							console.error(error);
							seterror(error);
							actions.openErrorlogin();
						}
					console.log(adminregistro);
					const respuesta = await actions.postadmin(adminregistro);
					if (respuesta === "realizado") {
						actions.openSuccessM();
					} else if (respuesta === "El correo electronico ya esta registrado") {
						seterror("El correo electronico ya esta registrado");
						actions.openErrorlogin();
					} else {
						seterror(respuesta);
						actions.openErrorlogin();
					}

				} else {
					console.log("es menor de edad");
					seterror("es menor de edad");
					actions.openErrorlogin();

				}

			} else {
				console.log("diligencie los datos");
				seterror("diligencie los datos");
				actions.openErrorlogin();
			}
		}

		console.log(adminregistro);
		
	}

	return (
		
		<div className="d-flex justify-content-center col-12">
		<div className="row pt-3">
			<div className="col-12 pt-3">
				<div className="containerRegistro col-12">
					<div className="RegistroAdministrador p-4 text-center bg-primary card-header col-12" style={{ color: 'white' }}>
						<h1>{adminId ? "Editar Administrador" : "Registro Administrador"}</h1></div>
					<div className="col-12 p-2" style={{backgroundColor: "rgba(185, 185, 187, 0.366)", borderRadius: "0px"}}>
						<form onSubmit={handlesubmit}>
							<div className="mb-1">
								<label htmlFor="name" className="form-label">Nombre</label>
								<input type="text" className="form-control" id="name" name="name" defaultValue={adminData.name} aria-describedby="name" />
							</div>
							<div className="mb-1">
								<label htmlFor="lastname" className="form-label">Apellido</label>
								<input type="text" className="form-control" id="lastname" name="lastname" defaultValue={adminData.lastname} aria-describedby="lastname" />
							</div>
							<div className="mb-1">
								<label htmlFor="dateborn" className="form-label">Fecha de nacimiento</label>
								<input type="date" className="form-control" id="dateborn" name="birthday" defaultValue={adminData.birthday} aria-describedby="dateborn" />
							</div>
							<div className="mb-1">
								<label htmlFor="exampleInputEmail1" className="form-label">Correo electronico</label>
								<input type="email" placeholder="@" className="form-control" id="exampleInputEmail1" name="email" defaultValue={adminData.email} aria-describedby="emailHelp" />
							</div>
							<div className="mb-1">
								<label htmlFor="charge" className="form-label">Cargo</label>
								<input type="text" className="form-control" id="charge" name="position" defaultValue={adminData.position} aria-describedby="charge" />
							</div>
							{adminId ? <span></span> :
							<>
								<div className="mb-1">
									<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
									<input type="password" className="form-control" name="password" id="exampleInputPassword1" />
								</div>
								
								<div className="mb-1">
									<label htmlFor="imageadmon" className="form-label">imagen</label>
									<input type="file" className="form-control" name="image_admon" id="imageadmon" />
								</div>
							</>}

							<div className="d-flex justify-content-center py-1">
								<button type="submit" className="btn-lg m-3 buttonHome">{adminId ? "Editar" : "Crear"}</button>
								<Modal error={error} />
								<ModalSuccess />
							</div>
							{adminId ?
							<div className="d-flex justify-content-center py-1">
							<Link to="/admons">
								<button type="button" className="btn btn-outline-secondary" disabled>Volver</button>
							</Link>
							</div>
							:
							<div className="d-flex justify-content-center py-1">
								<Link to="/admonlog">
									<button type="button" className="btn btn-outline-secondary" disabled>Volver</button>
								</Link>
							</div>
							}
						</form>
						{/* <Link to="/admonlog">
							<button type="button" className="btn btn-primary">Volver</button>
						</Link> */}
					</div>
				</div>
			</div>
		</div>
		</div>
	);
};
