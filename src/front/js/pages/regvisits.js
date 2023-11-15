import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Modal } from "../component/modal";

export const RegVisits = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [visitsData, setVisitsData] = useState({
        scope: "",
        date: "",
        project_id: "",
        specialist_id: ""
    });
    
    const [error, seterror]= useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        
        if (id) {
            const visitToEdit = store.allvisits.find(visit => visit.id === parseInt(id));
            if (visitToEdit) {
                visitToEdit.date = new Date(visitToEdit.date).toISOString().slice(0, 10);
                visitToEdit.specialist_id ="";
                visitToEdit.project_id ="";
               
                setVisitsData(visitToEdit);
            }
            
        }
    }, [id, store.allvisits]);

    const handleInputChange = (e) => {
        setVisitsData({
            ...visitsData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async (data, id) => {
        console.log(data)
        if(id){
            try {
                const respuesta = await actions.putvisitaadmon(data, id);
                actions.getEspecialista();
                actions.GetProjects();
                if (respuesta === "realizado"){
                    setVisitsData({
                        scope: "",
                        date: "",
                        project_id: "",
                        specialist_id: ""
                    }
                    );
                navigate("/profileadmon");
                }else {
                seterror(respuesta);
                actions.openErrorlogin();
                }
            } catch (error) {
        
            seterror(error.message || "Error desconocido");
            actions.openErrorlogin();
            console.error(error);
            }
            
        }else{
            try{
                const respuesta = await actions.registrovisita(data);
                    if (respuesta === "realizado"){
                            setVisitsData({
                                scope: "",
                                date: "",
                                project_id: "",
                                specialist_id: ""
                            }
                            );
                        navigate("/profileadmon");
                    }else {
                        seterror(respuesta);
                        actions.openErrorlogin();
                    }
                } catch (error) {
                
                    seterror(error.message || "Error desconocido");
                    actions.openErrorlogin();
                    console.error(error);
                }
            }
           
    };
    
    return (
        <div className="center-content">
            <div className="content-container">
                <div className="mb-3">
                    <label htmlFor="scope" className="form-label">Alcance</label>
                    <input type="text" className="form-control" id="scope" name="scope" value={visitsData.scope} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Fecha</label>
                    <input type="date" className="form-control" id="date" name="date" value={visitsData.date} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="project_id" className="form-label">Proyecto</label>
                    <select
                        className="form-select"
                        id="project_id"
                        name="project_id"
                        value={visitsData.project_id}
                        onChange={handleInputChange}
                    >
                        <option value="">Selecciona un proyecto</option>
                        {store.AllProjects.map((project, index) => (
                            <option key={index} value={project.id}>
                                Id: {project.id} | Nombre: {project.nameProject}| ubicación: {project.location}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="specialist_id" className="form-label">Especialista</label>
                    <select
                        className="form-select"
                        id="specialist_id"
                        name="specialist_id"
                        value={visitsData.specialist_id}
                        onChange={handleInputChange}
                    >
                        <option value="">Selecciona un especialista</option>
                        {store.allspecialist.map((specialist, index) => (
                            <option key={index} value={specialist.id}>
                                Id: {specialist.id} | Nombre: {specialist.nombre} {specialist.apellido}| Email: {specialist.email}
                            </option>
                        ))}
                    </select>

                </div>
                <button className="btn btn-primary" onClick={() =>{handleSave(visitsData, id)}}>
                    Save
                </button>
                    <Modal error={error}/>
                
                
                <Link to="/profileadmon" className="btn btn-secondary">
                   volver
                </Link>
            </div>
        </div>
    );
};

