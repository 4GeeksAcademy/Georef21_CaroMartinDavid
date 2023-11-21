import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Modal } from "../component/modal";
import { uploadFile } from "../../../firebase/config";

export const Register = props => {
    const { store, actions } = useContext(Context);
    const [especialistaData, setEspecialistaData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        area_de_desempeno: "",
        profesion: "",
        password: ""
    });
    const navigate = useNavigate();
    const [error, seterror]= useState("");
    const { id } = useParams();
    
    useEffect(() => {
        // console.log("id:", id);
        if (id) {

            // Si adminId está presente en la URL, llena el estado adminData con los datos del administrador a editar
            const specialistToEdit = store.allspecialist.find(specialistToEdit => specialistToEdit.id === parseInt(id));
            if (specialistToEdit) {
                setEspecialistaData(specialistToEdit);
            }
        }
    }, [id, store.allspecialist]);

    const handleInputChange = (e) => {
        const imageFile = e.target.querySelector('input[name="imageprofile"]').files[0];
        console.log(imageFile)
        setEspecialistaData({
            ...especialistaData,
            [e.target.name]: e.target.value
        });
        
    };

    const handlesave = async(e) => {
        e.preventDefault()
		e.persist();
		const formdata = new FormData(e.target);
		const specialistregistro = {};
		for (const entrada of formdata.entries()) {
			specialistregistro[entrada[0]] = entrada[1];
		}
        
        if(id){
            const data = specialistregistro;
            actions.putespecialist(id,data);
            actions.getEspecialista();
            navigate("/profileadmon");
        }else{
            try {
                const urlimage = await uploadFile(specialistregistro.imageprofile, "specialist");
                specialistregistro.imageprofile = urlimage;
                console.log(urlimage);
                }catch(error){
                    console.error(error);
                    seterror(error);
                    actions.openErrorlogin();
                }

            const respuesta = await actions.postespecialist(specialistregistro);
            if (respuesta === "realizado"){
                    
                    navigate("/profileadmon");
            }else{
                seterror(respuesta);
                actions.openErrorlogin();
            }
        }
        console.log(specialistregistro)
    }
    
    
    return (
        <div className="center-content">
            
            <div className="content-container col-md-6 m-auto">
                <div className="d-flex justify-content-center">
                   <h1>{id? "Editar Especialista":"Registrar Nuevo Especialista"}</h1>
                </div>
                
				<form onSubmit={handlesave}>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="nombre" name="nombre" defaultValue={especialistaData.nombre} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input type="text" className="form-control" id="apellido" name="apellido" defaultValue={especialistaData.apellido} />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" defaultValue={especialistaData.email}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="area_de_desempeno" className="form-label">Area de desempeno</label>
                            <input type="text" className="form-control" id="area_de_desempeno" name="area_de_desempeno" defaultValue={especialistaData.area_de_desempeno}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="profesion" className="form-label">Profesion</label>
                            <input type="text" className="form-control" id="profesion" name="profesion" 
                            defaultValue={especialistaData.profesion} />
                        </div>
                        {id ? <span></span> : 
                        <>
                             <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" defaultValue={especialistaData.password}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="imagen" className="form-label">Imagen</label>
                                <input type="file" className="form-control" id="imagen" name="imageprofile" defaultValue={especialistaData.imageprofile} />
                            </div>
                        </>
                        }
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary">
                            {id ? "Editar" : "Crear"}
                             </button>
                
                            <Modal error={error}/>
                        </div>
                </form>
                {/* Agrega un botón que redirija a otra ruta */}
                <Link to="/profileadmon" className="btn btn-secondary">
                    volver
                </Link>
            </div>
        </div>
    );

};

Register.propTypes = {
    match: PropTypes.object
};