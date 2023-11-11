import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Modal } from "../component/modal";
import axios from "axios"; // Import Axios

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
        setEspecialistaData({
            ...especialistaData,
            [e.target.name]: e.target.value
        });
    };

    const handlesave = async(especialistaData, id) => {
        
        if(id){
            const data = especialistaData;
            delete data.id;
            actions.putespecialist(id,data);
            actions.getEspecialista();
            navigate("/profileadmon");
        }else{
            const respuesta = await actions.postespecialist(especialistaData);
            if (respuesta === "realizado"){
                    setEspecialistaData({
                        nombre: "",
                        apellido: "",
                        email: "",
                        area_de_desempeno: "",
                        profesion: "",
                        password: ""
                    }
                    );
                    navigate("/profileadmon");
            }else{
                seterror(respuesta);
                actions.openErrorlogin();
            }
        }
    }
    
    
    return (
        <div className="center-content">
            
            <div className="content-container col-md-6 m-auto">
                <div className="d-flex justify-content-center">
                   <h1>{id? "Editar Especialista":"Registrar Nuevo Especialista"}</h1>
                </div>
                <div>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="nombre" name="nombre" value={especialistaData.nombre} onChange={handleInputChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="apellido" className="form-label">Apellido</label>
                        <input type="text" className="form-control" id="apellido" name="apellido" value={especialistaData.apellido} onChange={handleInputChange} />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" value={especialistaData.email} onChange={handleInputChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="area_de_desempeno" className="form-label">Area de desempeno</label>
                        <input type="text" className="form-control" id="area_de_desempeno" name="area_de_desempeno" value={especialistaData.area_de_desempeno} onChange={handleInputChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="profesion" className="form-label">Profesion</label>
                        <input type="text" className="form-control" id="profesion" name="profesion" value={especialistaData.profesion} onChange={handleInputChange} />
                    </div>
                    {id ? <span></span> : 
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={especialistaData.password} onChange={handleInputChange} />
                    </div>}
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={() => handlesave(especialistaData, id)}>
                        Save
                    </button>
                    <Modal error={error}/>
                </div>

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