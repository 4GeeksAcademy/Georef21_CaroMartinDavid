import React , { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { Modal } from "../component/modal";
import "../../styles/admon.css";

export const Administrator = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [error, seterror]= useState("");
    const { adminId } = useParams();

	const [adminData, setAdminData] = useState({
        name: "",
        lastname: "",
        birthday: "",
        email: "",
        position: "",
        password: "",
        aditional_info: ""
    });

	useEffect(() => {
		console.log("adminId:", adminId);
		if(adminId){
			if(store.administrator.id==adminId){
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

    function edad(date){
        const birthday = Date.parse(date)
        const today = new Date();
        const edadAdmin =  Math.floor((today - birthday) / (1000 * 60 * 60 * 24*365));
        return edadAdmin
    }

    async function handlesubmit(e){
        e.preventDefault()
        const formdata = new FormData(e.target);
        const adminregistro= {};
        for (const entrada of formdata.entries()){
            adminregistro[entrada[0]]=entrada[1];
        } 
		if(adminId){
			if (adminregistro.name != "" && adminregistro.lastname != "" && adminregistro.birthday != "" && adminregistro.email != "" && adminregistro.position != ""  && adminregistro.aditional_info != ""){
				const edadadmin =edad(adminregistro.birthday);
				if(edadadmin >= 18){
					await actions.putadmin(adminId,adminregistro);
					actions.getadmins();
					navigate("/profileadmon");
					
				}else{ 
					console.log("es menor de edad"); 
					seterror("es menor de edad");
					actions.openErrorlogin();
				}
			}else{
				console.log("diligencie los datos");
				seterror("diligencie los datos");
				actions.openErrorlogin();
			}
		}
		else{
			if (adminregistro.name != "" && adminregistro.lastname != "" && adminregistro.birthday != "" && adminregistro.email != "" && adminregistro.position != "" && adminregistro.password != "" && adminregistro.aditional_info != ""){
				const edadadmin =edad(adminregistro.birthday);
				if(edadadmin >= 18){
					const respuesta = await actions.postadmin(adminregistro);
					if (respuesta === "realizado"){
						navigate("/admonlog");
					}else if(respuesta === "El correo electronico ya esta registrado"){
						seterror("El correo electronico ya esta registrado");
						actions.openErrorlogin();
					}else{
						seterror(respuesta);
						actions.openErrorlogin();
					}
					
			}else{ 
				console.log("es menor de edad"); 
				seterror("es menor de edad");
				actions.openErrorlogin();

		}

		}else{
				console.log("diligencie los datos");
				seterror("diligencie los datos");
				actions.openErrorlogin();
			}}
    }

	return (
		<div className="container">
			<h1>{adminId ? "Editar Administrador" : "Registro Administrador"}</h1>
			<div className="col-md-6">
				<form onSubmit={handlesubmit}>
					<div className="mb-3">
						<label htmlFor="name" className="form-label">Nombre</label>
						<input type="text" className="form-control" id="name" name="name"  defaultValue={adminData.name} aria-describedby="name"/>
					</div>
					<div className="mb-3">
						<label htmlFor="lastname" className="form-label">Apellido</label>
						<input type="text" className="form-control" id="lastname" name="lastname" defaultValue={adminData.lastname} aria-describedby="lastname"/>
					</div>
					<div className="mb-3">
						<label htmlFor="dateborn" className="form-label">Fecha de nacimiento</label>
						<input type="date" className="form-control" id="dateborn" name="birthday" defaultValue={adminData.birthday} aria-describedby="dateborn"/>
					</div>
					<div className="mb-3">
						<label htmlFor="exampleInputEmail1" className="form-label">Correo electronico</label>
						<input type="email" className="form-control" id="exampleInputEmail1" name="email" defaultValue={adminData.email} aria-describedby="emailHelp"/>
					</div>
					<div className="mb-3">
						<label htmlFor="charge" className="form-label">Cargo</label>
						<input type="text" className="form-control" id="charge" name="position" defaultValue={adminData.position} aria-describedby="charge"/>
					</div>
					{adminId ? <span></span> : 
					<div className="mb-3">
						<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
						<input type="password" className="form-control" name="password"  id="exampleInputPassword1"/>
					</div>}
					
					<div className="form-floating">
						<textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" name="aditional_info" defaultValue={adminData.aditional_info} style={{height: '100px'}}></textarea>
						<label htmlFor="floatingTextarea2">Información adicional</label>
					</div>
					<div className="d-flex justify-content-center py-3">
						<button type="submit" className="btn btn-primary">{adminId ? "Editar" : "Crear"}</button>
						<Modal error={error}/>
					</div>
				</form>
				<Link to="/admonlog">
					<button type="button" className="btn btn-outline-dark">Volver</button>
				</Link>
        	</div>
			
		</div>
	);
};
